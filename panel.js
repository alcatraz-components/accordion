import { LitElement, html, css } from 'lit-element';

class AlcatrazAccordionPanel extends LitElement {
  constructor() {
    super();

    this.label = '';
    this.expanded = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--alcatraz-accordion-item-padding, 1rem);
      }

      h3 {
        margin: 0;
      }

      button {
        background-color: transparent;
        border: none;
        color: var(--alcatraz-accordion-item-btn-color, inherit);
        display: block;
        font-size: var(--alcatraz-accordion-button-font-size, 20px);
        padding: 0;
        text-align: var(--alcatraz-accordion-button-text-align, left);
        width: 100%;
      }

      div {
        margin-top: var(--alcatraz-accordion-panel-margin-top, 1rem);
      }
    `;
  }

  static get properties() {
    return {
      label: { type: String },
      expanded: { type: Boolean }
    };
  }

  convertLabel(string) {
    return string.replace(/\s/g, '-').toLowerCase();
  }

  render() {
    return html`
      ${this.label
        ? html`
            <h3>
              <button
                id="button-${this.convertLabel(this.label)}"
                type="button"
                .aria-expanded="${this.expanded}"
                aria-controls="panel-${this.convertLabel(this.label)}"
                tabindex="-1"
              >
                ${this.label}
              </button>
            </h3>
          `
        : null}
      <div
        id="panel-${this.convertLabel(this.label)}"
        role="region"
        aria-labelledby="button-${this.convertLabel(this.label)}"
        .hidden="${!this.expanded}"
      >
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('alcatraz-accordion-panel', AlcatrazAccordionPanel);
