# @alcatraz-components/accordion

A keyboard-accessible accordion component.

## Usage

In HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Use a JS module to add the component to your page -->
    <script type="module" src="index.js"></script>

    <!-- Use CSS custom properties to alter styles within the component. -->
    <style>
      :root {
        --alcatraz-accordion-border: 2px solid #ddd;
        --alcatraz-accordion-border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <alcatraz-accordion>
      <alcatraz-accordion-panel label="K2" expanded="true">
        <p>Age: 13</p>
        <p>Color: gray</p>
      </alcatraz-accordion-panel>
      <alcatraz-accordion-panel label="Whitney">
        <p>Age: 13</p>
        <p>Color: orange</p>
      </alcatraz-accordion-panel>
      <alcatraz-accordion-panel label="Minnie Mitzie">
        <p>Age: 4</p>
        <p>Color: gray</p>
      </alcatraz-accordion-panel>
      <alcatraz-accordion-panel label="Paul">
        <p>Age: 3</p>
        <p>Color: orange</p>
      </alcatraz-accordion-panel>
    </alcatraz-accordion>
  </body>
</html>
```

In a JavaScript application:

```
npm install @alcatraz-components/accordion
```

```js
import '@alcatraz-components/accordion
```

If you are using [webpack](https://webpack.js.org/), you can instead include the component in your entry array:

```js
module.exports = {
  entry: ['@alcatraz-component/accordion', './index.js']
};
```

## Configurable styles

Use the [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) outlined below to customize the look of the accordion from your stylesheet.

```css
:root {
  /* Accordion */
  --alcatraz-accordion-border: 1px solid #ddd;
  --alcatraz-accordion-border-radius: 0;

  /* Item */
  --alcatraz-accordion-item-padding: 1rem;
  --alcatraz-accordion-button-bg-color: #fff;
  --alcatraz-accordion-button-font-size: 20px;
  --alcatraz-accordion-button-text-align: left;
  --alcatraz-accordion-panel-margin-top: 1rem;
}
```
