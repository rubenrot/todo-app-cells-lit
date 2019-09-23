import {CellsPage} from '@cells/cells-page';
import {html} from 'lit-element';
import '@cells-components/cells-template-paper-drawer-panel';
import 'lodash/lodash.min.js';
import '../../elements/lit-elements/header-hack.js';
import '../../elements/lit-elements/ajax-hack.js';

class GooglePage extends CellsPage {
  static get is() {
    return 'google-page';
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  firstUpdated() {
    super.firstUpdated();
    this._handleConnections();

  }

  _handleConnections() {

  }

  render() {
    return html`
    <style>${this.constructor.shadyStyles}</style>
      
     <cells-template-paper-drawer-panel header-hidden="" state="active">
          <div slot="app__main" class="todo-app-container">
            <div>
               <header-hack></header-hack>
               <ajax-hack></ajax-hack>
            </div>
          </div>
        </cells-template-paper-drawer-panel>

    `;
  }

  static get shadyStyles() {
    return `
      `;
  }
}

window.customElements.define(GooglePage.is, GooglePage);
