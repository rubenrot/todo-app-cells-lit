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

    if (page === 'todo-app') {
      this.publish('google-channel',
        {
          page: 'google-page',
          additionalData: 'rot'
        });
      this.navigate('enterprise');
    } else {
      this.navigate('google');
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
        <button @click="${() => this.handleClickLink('todo-app')}">Todo App</button>
        <button @click="${() => this.handleClickLink('ajax-users')}">Users</button>
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
    `;
  }
}

// Register the element with the browser
customElements.define(HeaderHack.is, HeaderHack);
