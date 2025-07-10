import { Component } from '@angular/core';
import { CountrySelectorComponent } from 'country-selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountrySelectorComponent],
  template: `
    <h2>Test Country Selector</h2>
    <cs-country-selector
      [includeFlags]="true"
      [initialCountryCode]="'FR'"
      (countrySelected)="onCountrySelected($event)"
      containerClass="my-wrapper"
      inputClass="my-input"
      dropdownClass="my-dropdown"
      itemClass="my-item"
      activeItemClass="my-item-active"
      flagClass="my-flag"
      selectedFlagClass="my-flag-selected"
    >
    </cs-country-selector>
  `
})
export class AppComponent {
  onCountrySelected(event: any) {
    console.log('Selected country:', event);
  }
}
