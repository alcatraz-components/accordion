import { LitElement, html, css } from 'lit-element';
import './panel';

class AlcatrazAccordion extends LitElement {
  constructor() {
    super();

    this.panels = [];
    this.multiPanel = false;
    this.initialized = false;
  }

  static get properties() {
    return {
      panels: { type: Array },
      currentPanel: { type: Number },
      previousPanel: { type: Number },
      multiPanel: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        border: var(--alcatraz-accordion-border, 1px solid #ddd);
        display: block;
      }

      ::slotted(*:not(:first-of-type)) {
        border-top: var(--alcatraz-accordion-border, 1px solid #ddd);
      }
    `;
  }

  shouldUpdate(changedProperties) {
    if (!this.initialized) {
      this.panels = Array.from(this.children);
      this.panels.map(panel => panel.setAttribute('tabIndex', '0'));
      this.addEventListener('click', this.handleClick);
      this.addEventListener('keyup', this.handleKeyup);
      this.initialized = true;
    }

    return changedProperties;
  }

  handleKeyup(event) {
    const { keyCode } = event;
    let { target } = event;

    event.preventDefault();

    switch (keyCode) {
      // Arrow down.
      case 40:
        if (target !== this.panels[this.panels.length - 1]) {
          target = target.nextElementSibling;
        } else {
          target = this.panels[0];
        }
        break;

      // Arrow up.
      case 38:
        if (target !== this.panels[0]) {
          target = target.previousElementSibling;
        } else {
          target = this.panels[this.panels.length - 1];
        }
        break;

      // Enter & Space.
      case 13:
      case 32:
        this.updatePanels(target);
        break;

      default:
        break;
    }

    target.focus();
  }

  handleClick(event) {
    const { target } = event;
    this.updatePanels(target);
  }

  updatePanels(target) {
    this.panels.map(panel => {
      if (
        !this.multiPanel &&
        panel.hasAttribute('expanded') &&
        panel !== target
      ) {
        panel.removeAttribute('expanded');
      }

      if (panel === target) {
        if (panel.hasAttribute('expanded')) {
          panel.removeAttribute('expanded');
        } else {
          panel.setAttribute('expanded', 'true');
        }
      }
    });

    return this.panels;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('alcatraz-accordion', AlcatrazAccordion);
