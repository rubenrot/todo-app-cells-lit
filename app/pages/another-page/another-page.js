import {CellsPage} from '@cells/cells-page';
import {html} from 'lit-element';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';

class AnotherPage extends CellsPage {
  static get is() {
    return 'another-page';
  }

  static get properties() {
    return {
      _headerTitle: { type: String },
      fromPage: { type: String },
      params: { type: String }
    };
  }

  set headerTitle(value) {
    if (this._headerTitle !== value) {
      this._headerTitle = value;
      this.requestUpdate();
    }
  }

  get headerTitle() {
    return this._computeHeaderTitle(this.params);
  }

  firstUpdated() {
    super.firstUpdated();
    this._handleConnections();
  }

  _computeHeaderTitle(params) {
    const pageTitle = params.title || '';

    return decodeURI(pageTitle).replace(/-/g, ' ');
  }

  _handleConnections() {
    this.subscribe('from-channel', data => {
      const { from } = data;
      console.log('Rot escribe este log: ', data);
      this.fromPage = from;
    });
  }

  _handleClick() {
    this.navigate('home');
  }

  render() {
    return html`
      <style>${this.constructor.shadyStyles}</style>
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
          <bbva-header-main
            text=${this.headerTitle}>
          </bbva-header-main>
        </div>

        <div slot="app__main" class="container">
          <div class="set-padding blue">
          </div>
          <button id="navigateButton"
                  @click="${this._handleClick}"
                  class="prev-next-button previous">&larr;</button>
          <h2>Go back to ${this.fromPage} page!</h2>
        </div>
      </cells-template-paper-drawer-panel>`;
  }

  static get shadyStyles() {
    return `
      bbva-header-main {
        --bbva-header-main-bg-color: #a00037;
      }

      cells-template-paper-drawer-panel {
        background-color: #ff5c8d;
      }

      .container {
        padding-bottom: 140px;
        margin: 20px 20px 40px;
        background-color:#d81b60 ;
        position: relative;
      }

      .container h2 {
        padding-top: 20%;
        color: white;
        text-align: center;
        font-family: sans-serif;
      }

      .container:after {
        content: '';
        display: block;
        clear: both;
      }

      .prev-next-button {
        position: absolute;
        top: 50%;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: white;
        border: none;
        font-size: 30px;
        color: #a00037;
        transform: translateY(-50%);
      }

      .previous { left: 10px; }
      .next { right: 10px; }
    `;
  }
}

window.customElements.define(AnotherPage.is, AnotherPage);
