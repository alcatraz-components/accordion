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
      multiPanel: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        border: var(--alcatraz-accordion-border, 1px solid #ddd);
        border-radius: var(--alcatraz-accordion-border-radius, 0);
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

  setNextPanel(target) {
    if (target !== this.panels[this.panels.length - 1]) {
      return target.nextElementSibling;
    } else {
      return this.panels[0];
    }
  }

  setPreviousPanel(target) {
    if (target !== this.panels[0]) {
      return target.previousElementSibling;
    } else {
      return this.panels[this.panels.length - 1];
    }
  }

  handleKeyup(event) {
    const { keyCode } = event;
    let { target } = event;

    event.preventDefault();

    switch (keyCode) {
      // Tab.
      case 9:
        if (event.shiftKey) {
          target = this.setPreviousPanel(target);
        } else {
          target = this.setNextPanel(target);
        }

        break;

      // Arrow down.
      case 40:
        target = this.setNextPanel(target);
        break;

      // Arrow up.
      case 38:
        target = this.setPreviousPanel(target);
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

  render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('alcatraz-accordion', AlcatrazAccordion);
