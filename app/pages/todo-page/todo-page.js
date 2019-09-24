import {CellsPage} from '@cells/cells-page';
import {html} from 'lit-element';
import '@cells-components/cells-template-paper-drawer-panel';
import '../../elements/lit-elements/add-item.js';
import '../../elements/lit-elements/list-item.js';
import 'lodash/lodash.min.js';
import '../../elements/lit-elements/header-hack.js';

class TodoPage extends CellsPage {
  static get is() {
    return 'todo-page';
  }

  static get properties() {
    return {
      todoList: {
        type: Array
      }
    };
  }

  constructor() {
    super();
    let list = JSON.parse(localStorage.getItem('todo-list'));
    this.todoList = list === null ? [] : list;
  }

  /* firstRendered() {
     this.addEventListener('addItem', (e) => {
       this.todoList = e.detail.todoList;
     })
   }    */

  firstUpdated() {
    super.firstUpdated();
    this._handleConnections();
  }

  _handleConnections() {
    this.addEventListener('addItem', (e) => {
      this.todoList = e.detail.todoList;
    });

    this.addEventListener('removeItem', (e) => {
      console.log(e.detail);

      let index = this.todoList.map(function (item) {
        return item.id;
      }).indexOf(e.detail.item);

      this.todoList.splice(index, 1);
      //re render this.setState({});
      //Some objects are not triggering some events
      //Documentation about unmutable objects.
      this.todoList = _.clone(this.todoList);
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));


    });

    this.addEventListener('changeItem', (e) => {
      let index = this.todoList.map(function (item) {
        return item.id;
      }).indexOf(e.detail.item);
      this.todoList[index].done = !this.todoList[index].done;
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    });

    this.subscribe('todo-channel', data => {
      const {fromObj} = data;
      console.log(data);
      if (data.page === 'todo-page') {
        console.log('Evento recibido - Todo Page');
      }
    });
  }

  render() {
    return html`
    <style>${this.constructor.shadyStyles}</style>
      
     <cells-template-paper-drawer-panel header-hidden="" state="active">
          <div slot="app__header" class="my-header">
          header
          </div>
          <div slot="app__main" class="todo-app-container">
            <div>
            <header-hack></header-hack>
              <div>
                <add-item></add-item>
                <list-item .todoList=${this.todoList}></list-item>
              </div>
                 
            </div>
              
          </div>
        </cells-template-paper-drawer-panel>

    `;
  }

  static get shadyStyles() {
    return `

    cells-template-paper-drawer-panel {
        --cells-template-paper-drawer-panel-section-bg: #072146;
        --cells-template-paper-drawer-panel-section: {
          display: block;          
        }
      }
      
      
      .my-header {
        display: none;
      }
            
      .todo-app-container {
        position: relative;
        background: #072146;
        height: 100%;
        font-size: 15px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        letter-spacing: -0.02px;
      }
  
      body {
        margin: 0;
        padding: 0;
      }
  
      * {
        transition: 120ms all ease-in-out;
      }
  
      .footer {
        text-align: center;
        margin-top: auto;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 700;
        font-size: 0.875rem;
        text-transform: uppercase;
        position: fixed;
        width: 350px;
        left: 2rem;
        bottom: 2rem;
        padding: 1rem;
        box-sizing: border-box;
      }
  
      .footer a {
        color: rgba(255, 255, 255, 0.5);
        text-decoration: none;
      }
  
      .footer a:hover {
        color: #fff;
      }
  
      .d-flex {
        display: flex;
        align-items: center;
        margin-top: 1rem;
      }
  
      /** Portrait Mobile **/
  
      @media (max-width: 1198px) {
        html {
          font-size: 14px;
        }
        .footer {
          width: auto;
          right: 0;
          left: 0;
          bottom: 0;
          background: #004BC8;
          padding: 1rem;
        }
      }
  
      /** Landscape view mobile & tablets **/
  
      @media (max-width: 992px) and (orientation:landscape) {
        .footer {
          left: 0;
          bottom: 0;
        }
      }

    `;
  }
}

window.customElements.define(TodoPage.is, TodoPage);
