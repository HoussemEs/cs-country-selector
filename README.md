<h1>🌍 cs-country-selector</h1>

<p>A lightweight, fully customizable country selector component for Angular, with flag support, keyboard accessibility, dynamic filtering, and zero dependencies.</p>

<blockquote>
  <p>💡 Built with modern Angular (standalone components) — works with all Angular versions and styles (SCSS, CSS, Tailwind, etc.)</p>
</blockquote>

<hr />

<h2>✨ Features</h2>
<ul>
  <li>✅ Country list with flags, codes, and names</li>
  <li>🎯 <code>onlyCountries</code> and <code>excludeCountries</code> filters</li>
  <li>🔍 Search with <code>startsWith</code> behavior</li>
  <li>🧠 Keyboard accessibility (arrow keys + enter)</li>
  <li>🪶 Small size, zero dependencies</li>
  <li>🎨 Fully customizable layout and appearance</li>
  <li>🔧 Compatible with ReactiveForms and ngModel</li>
  <li>♿ Accessible with ARIA attributes</li>
</ul>

<hr />
   <h2>✨ Demo</h2>
   ![cs-country-selector demo](./src/assets/demo.png)
<hr />

<h2>🚀 Installation</h2>
<pre><code>npm install cs-country-selector
</code></pre>

<hr />

<h2>🔧 Usage</h2>

<pre><code>&lt;cs-country-selector
  [(ngModel)]="selectedCountry"
  [placeholder]="'Choose your country...'"
  [includeFlags]="true"
  [onlyCountries]="['US', 'FR', 'DE']"
  [excludeCountries]="['KP']"
  [containerClass]="'custom-container'"
  [inputClass]="'custom-input'"
  [dropdownClass]="'custom-dropdown'"
  [itemClass]="'custom-item'"
  [activeItemClass]="'highlighted'"
  [flagClass]="'flag-icon'"
  [selectedFlagClass]="'flag-icon-selected'"
  (countrySelected)="onCountryChange($event)"
&gt;&lt;/cs-country-selector&gt;
</code></pre>

<pre><code>import { Country } from 'cs-country-selector';

selectedCountry: Country | null = null;

onCountryChange(country: Country | null) {
  console.log('Selected:', country);
}
</code></pre>

<hr />

<h2>📦 Country Object Format</h2>

<pre><code>interface Country {
  code: string;     // e.g. "FR"
  name: string;     // e.g. "France"
  flagUrl: string;  // e.g. "https://.../fr.svg"
}
</code></pre>

<hr />

<h2>🎨 Full Customizability</h2>

<p>The <code>cs-country-selector</code> is built to be styled your way — without forcing a design system or theme. You can pass your own classes or override CSS variables.</p>

<h3>✅ CSS Class Bindings</h3>

<p>Use these <code>[Input()]</code> bindings to add your own classes while retaining the internal ones:</p>

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Target Element</th>
      <th>Default Class</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>containerClass</td><td>&lt;div&gt; root wrapper</td><td><code>country-selector-container</code></td></tr>
    <tr><td>inputClass</td><td>&lt;input&gt; search field</td><td><code>country-input</code></td></tr>
    <tr><td>dropdownClass</td><td>Dropdown container</td><td><code>country-dropdown</code></td></tr>
    <tr><td>itemClass</td><td>Each country &lt;li&gt;</td><td><code>country-item</code></td></tr>
    <tr><td>activeItemClass</td><td>Active country (hover/arrow)</td><td><code>active</code></td></tr>
    <tr><td>flagClass</td><td>All flags</td><td><code>country-flag</code></td></tr>
    <tr><td>selectedFlagClass</td><td>Flag inside input field</td><td><code>selected-country-flag</code></td></tr>
  </tbody>
</table>

<p>You can override any style using global CSS or component-level styles.</p>

<h4>💡 Example</h4>

<pre><code>.custom-input {
  border-radius: 8px;
  background-color: #f0f0f0;
  padding: 10px;
  font-size: 14px;
}
</code></pre>

<h3>🎨 Custom Scrollbar (via CSS Variables)</h3>

<p>Scrollbar design is fully themeable via CSS variables — no need to override deeply nested elements.</p>

<h4>Available CSS Variables</h4>
<ul>
  <li><code>--cs-scrollbar-thumb-color</code></li>
  <li><code>--cs-scrollbar-thumb-hover-color</code></li>
  <li><code>--cs-scrollbar-width</code></li>
  <li><code>--cs-scrollbar-radius</code></li>
</ul>

<pre><code>cs-country-selector {
  --scrollbar-thumb-color: #00bcd4;
  --scrollbar-thumb-hover-color: #0097a7;
  --scrollbar-width: 10px;
  --scrollbar-radius: 10px;
}
</code></pre>

<hr />

<h2>⚙️ Filtering Countries</h2>

<h3><code>onlyCountries: string[]</code></h3>
<p>Displays <strong>only</strong> the countries listed (by ISO alpha-2 code):</p>

<pre><code>&lt;cs-country-selector [onlyCountries]="['FR', 'DE']" /&gt;
</code></pre>

<h3><code>excludeCountries: string[]</code></h3>
<p>Hides the countries listed:</p>

<pre><code>&lt;cs-country-selector [excludeCountries]="['KP']" /&gt;
</code></pre>

<p>You can combine both as needed.</p>

<hr />

<h2>📜 License</h2>

<p>MIT © Houssem Hosni</p>

<hr />

<h2>🙌 Contribute</h2>

<p>Found a bug? Want to suggest a feature? Open a PR or issue on GitHub — contributions welcome!</p>