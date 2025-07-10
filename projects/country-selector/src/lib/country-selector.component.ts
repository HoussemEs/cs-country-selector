import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, map, takeUntil } from 'rxjs/operators';
import { countries as allCountries } from './countries';

interface Country {
  code: string;
  name: string;
  flagUrl: string;
}

@Component({
  selector: 'cs-country-selector',
  standalone: true,
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectorComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountrySelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() initialCountryCode = '';
  @Input() includeFlags = true;
  @Input() onlyCountries: string[] = [];
  @Input() excludeCountries: string[] = [];
  @Input() placeholder = 'Search for a country...';

  @Input() containerClass = '';
  @Input() inputClass = '';
  @Input() dropdownClass = '';
  @Input() flagClass = '';
  @Input() selectedFlagClass = '';
  @Input() itemClass = '';
  @Input() activeItemClass = '';


  @Output() countrySelected = new EventEmitter<Country | null>();

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  selectedCountry: Country | null = null;
  countrySearchControl = new FormControl('');
  displayValue = '';
  showDropdown = false;
  highlightIndex = -1;
  activeDescendant = '';

  private onChange: (value: Country | null) => void = () => {};
  private onTouched: () => void = () => {};
  private destroy$ = new Subject<void>();
  private blurTimeout: any;

  ngOnInit() {
    this.countries = this.getFilteredCountries(allCountries);
    this.filteredCountries = this.countries;

    if (this.initialCountryCode && !this.selectedCountry) {
      const match = this.countries.find(c => c.code === this.initialCountryCode);
      if (match) this.writeValue(match);
    }

    this.countrySearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      map(term => this._filterCountries(term || '')),
      takeUntil(this.destroy$)
    ).subscribe(results => {
      this.filteredCountries = results;
      this.highlightIndex = -1;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  writeValue(country: Country | null): void {
    this.selectedCountry = country;
    this.displayValue = country?.name || '';
    this.countrySearchControl.setValue(this.displayValue, { emitEvent: false });
  }

  registerOnChange(fn: (value: Country | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.countrySearchControl.disable() : this.countrySearchControl.enable();
  }

  private getFilteredCountries(source: Country[]): Country[] {
    let filtered = [...source];
    if (this.onlyCountries.length) filtered = filtered.filter(c => this.onlyCountries.includes(c.code));
    if (this.excludeCountries.length) filtered = filtered.filter(c => !this.excludeCountries.includes(c.code));
    return filtered;
  }

  private _filterCountries(term: string): Country[] {
    const filter = term.toLowerCase();
    return this.getFilteredCountries(this.countries).filter(c => c.name.toLowerCase().startsWith(filter));
  }

  selectCountry(country: Country | null) {
    this.selectedCountry = country;
    this.displayValue = country?.name || '';
    this.countrySearchControl.setValue(this.displayValue, { emitEvent: false });
    this.countrySelected.emit(country);
    this.onChange(country);
    this.showDropdown = false;
    this.highlightIndex = -1;
    this.activeDescendant = '';
  }

  onFocus() {
    this.onTouched();
    if (this.countrySearchControl.value === this.displayValue) {
      this.countrySearchControl.setValue('', { emitEvent: false });
      this.filteredCountries = this.countries;
    }
    this.showDropdown = true;
  }

  onBlur() {
    this.blurTimeout = setTimeout(() => {
      this.showDropdown = false;
      const value = this.countrySearchControl.value;
      const match = this.countries.find(c => c.name.toLowerCase() === (value || '').toLowerCase());

      if (match) {
        this.selectCountry(match);
      } else {
        this.selectCountry(null);
      }

      this.onTouched();
      this.highlightIndex = -1;
      this.activeDescendant = '';
    }, 150);
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.showDropdown || this.filteredCountries.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.highlightIndex = (this.highlightIndex + 1) % this.filteredCountries.length;
      this.setActiveDescendant();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.highlightIndex = (this.highlightIndex - 1 + this.filteredCountries.length) % this.filteredCountries.length;
      this.setActiveDescendant();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.highlightIndex >= 0) this.selectCountry(this.filteredCountries[this.highlightIndex]);
    } else if (event.key === 'Escape') {
      this.showDropdown = false;
      this.highlightIndex = -1;
      this.activeDescendant = '';
    }
  }

  private setActiveDescendant() {
    this.activeDescendant = this.highlightIndex >= 0 ? `country-option-${this.highlightIndex}` : '';
  }
}
