import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectorComponent } from './country-selector.component.ts';

describe('CountrySelector', () => {
  let component: CountrySelectorComponent;
  let fixture: ComponentFixture<CountrySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
