import {CellsPage} from '@cells/cells-page';
import {LitElement, html,} from 'lit-element';

class HeaderHack extends CellsPage {
  static get is() {
    return 'header-hack';
  }

  // Declare properties
  static get properties() {
    return {
      todoList: {
        type: Array
      }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.todoList = [];
  }

  firstUpdated() {
    super.firstUpdated();
    this._handleConnections();

  }

  handleClickLink(page) {

    if (page === 'todo') {
      this.publish('todo-channel',
        {
          page: 'todo-page',
          additionalData: 'rot'
        });
      this.navigate(page);
    } else {
      this.navigate(page);
    }


  }

  _handleConnections() {

  }


  render() {
    this.todoList.map(function (itemList) {
      console.log(itemList);
    });
    return html`
    <style>${this.constructor.shadyStyles}</style>
    <div class="app">
      <header class="app-header">
        <img src="../../resources/images/touch/google.png" class="app-logo" alt="logo" />
        <h1 class="app-title">Welcome to Ninja Hack</h1>
      </header>
      <div class="app-links">
        <button class="hbl-btn" @click="${() => this.handleClickLink('todo')}">Todo App</button>
        <button class="hbl-btn" @click="${() => this.handleClickLink('users')}">Users</button>
      </div>
      <div id="outlet"></div>
        
    </div>
    `;
  }


  static get shadyStyles() {
    return `
     .app {
        text-align: center;
        font-family: sans-serif;
      }
      
      .app-logo {
        animation: app-logo-spin infinite 20s linear;
        height: 80px;
        margin-top: 10px;
      }
      
      .app-header {
        background-color: #09112d;
        height: 150px;
        padding: 20px;
        color: white;
      }
      
      .app-gh {
        position: fixed;
        width: 25px;
        bottom: 25px;
        left: 25px;
      }
      
      .app-links {
         padding: 20px;
         background-color: #131d40;
      }
      
      @keyframes app-logo-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      a {
        color: #fc4482;
      }
      .hbl-btn {
  cursor: pointer;
  height: 40px;
  padding: 12px 40px;
  margin: 32px 0 16px;
  font-family: Arial;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: center;
  color: #FFFFFF;
  background-image: linear-gradient(100deg, #1464A5 50%, #1973B8 50%);
  background-size: 250% 100% !important;
  background-position: right !important;
  transition: all 0.5s ease;
  border: none;
      outline: none;
}

.hbl-btn.secondary {
  background-image: linear-gradient(100deg, #052954 50%, #043263 50%);
}

.hbl-btn.link {
  color: #1973B8;
  background: transparent;
}

.hbl-btn.link:hover {
  color: #004481;
}

.hbl-btn[disabled] {
  background: #E9E9E9;
  color: #BDBDBD;
  cursor: not-allowed;
}

button:hover.hbl-btn {
  background-position: left !important;
  color: rgba(255, 255, 255, 0.6);
}

input {
  outline: none;
  border: none;
}
    `;
  }
}

// Register the element with the browser
customElements.define(HeaderHack.is, HeaderHack);
