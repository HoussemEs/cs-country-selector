<h1>cs-country-selector Demo App</h1>

<p>This is a simple Angular demo application showcasing the usage of the <code>cs-country-selector</code> component — a fully customizable country selector with flags, search, and filtering.</p>

<hr />

<h2>🚀 Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> (v20 or higher)</li>
  <li><a href="https://angular.io/cli">Angular CLI</a> globally installed</li>
</ul>

<h3>Installation</h3>
<pre><code>git clone &lt;https://github.com/HoussemEs/cs-country-selector.git&gt;
cd cs-country-selector
npm install
cd country-selector-demo
</code></pre>

<h3>Running the App</h3>
<pre><code>ng serve
</code></pre>
<p>Open your browser and go to <a href="http://localhost:4200/" target="_blank">http://localhost:4200/</a> to see the country selector in action.</p>

<hr />

<h2>🔧 How to Use the Component in This Demo</h2>

<p>The demo app imports the <code>cs-country-selector</code> component and binds it with Angular forms to demonstrate its usage:</p>

<pre><code>&lt;cs-country-selector
  [(ngModel)]="selectedCountry"
  [placeholder]="'Select your country...'"
  [includeFlags]="true"
  [onlyCountries]="['US', 'FR', 'DE', 'IT']"
  (countrySelected)="onCountryChange($event)"
&gt;&lt;/cs-country-selector&gt;
</code></pre>

<p>In the demo component's TypeScript:</p>

<pre><code>import { Country } from 'cs-country-selector';

export class DemoComponent {
  selectedCountry: Country | null = null;

  onCountryChange(country: Country | null) {
    console.log('Country selected:', country);
  }
}
</code></pre>

<hr />

<h2>🎨 Customization</h2>

<p>Try changing input properties such as:</p>
<ul>
  <li><code>onlyCountries</code> or <code>excludeCountries</code> arrays</li>
  <li>Custom CSS classes like <code>containerClass</code>, <code>inputClass</code>, etc.</li>
  <li>Toggle flags on/off with <code>[includeFlags]</code></li>
</ul>

<hr />

<h2>🛠️ Build the Library Locally</h2>

<p>If you want to make local edits and test them here:</p>

<pre><code>cd ../country-selector
npm run build
cd ../cs-country-selector
npm link ../country-selector
</code></pre>

<hr />

<h2>📜 License</h2>

<p>MIT © Houssem Hosni</p>

<hr />

<h2>🙌 Contributions</h2>

<p>Feel free to submit issues or pull requests to improve the demo or the component!</p>
