import {CellsPage} from '@cells/cells-page';
import {html} from 'lit-element';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';

class HomePage extends CellsPage {
  static get is() {
    return 'home-page';
  }

  constructor() {
    super();
    this.headerTitle = 'This the home page!';
  }

  static get properties() {
    return {
      headerTitle: {type: String}
    };
  }

  onPageEnter() {
    console.log('Page loaded');
  }

  onPageLeave() {
    console.log('Page unloaded');
  }

  _handleClick() {
    this.publish('from-channel', {from: 'home'});
    //this.navigate('another', {title: 'This is another page'});
    this.navigate('enterprise');
  }

  render() {
    return html`
    <style>${this.constructor.shadyStyles}</style>
    <div slot="app__main" class="container">
    <h2>Navigate to another page</h2>
    <button id="navigateButton"
            @click="${this._handleClick}"
            class="prev-next-button next">&rarr;</button>
  </div>
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
          <bbva-header-main
            text=${this.headerTitle}>
          </bbva-header-main>
        </div>

        <div slot="app__main" class="container">
          <h2>Navigate to another page</h2>
          <button id="navigateButton"
                  @click="${this._handleClick}"
                  class="prev-next-button next">&rarr;</button>
        </div>
     </cells-template-paper-drawer-panel>`;
  }

  static get shadyStyles() {
    return `
      bbva-header-main {
        --bbva-header-main-bg-color: #002171;
      }

      cells-template-paper-drawer-panel {
        background-color: #5472d3;
      }

      .container {
        padding-bottom: 140px;
        margin: 20px 20px 40px;
        background-color:#0d47a1 ;
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
        color: #0d47a1;
        transform: translateY(-50%);
      }

      .previous { left: 10px; }
      .next { right: 10px; }
    `;
  }
}

window.customElements.define(HomePage.is, HomePage);

