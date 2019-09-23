import {LitElement, html,} from 'lit-element';
import '../../elements/lit-elements/todo-item.js';

class ListItem extends LitElement {
  static get is() {
    return 'list-item';
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


  render() {
    this.todoList.map(function (itemList) {
      console.log(itemList);
    });
    return html`
    <style>${this.constructor.shadyStyles}</style>
    <div class="lists">
        <div class="list">
           <h2 class="title">Today's To Do List</h2>
              <div class="list-wrapper">
      
      ${this.todoList.map(item => html`<todo-item .todoItem=${item}></todo-item>`)}
      
              </div>
        </div>
    </div>
    `;
  }


  static get shadyStyles() {
    return `
    .lists {
        /*padding-left:350px;*/
        margin:0 auto;
        max-width:500px;
    }
    .list {
        transform-origin:center bottom;
        transition:200ms all linear;
    }
    .list .title {
        color:#B8D4FF;
        font-size:1.5rem;
        letter-spacing:5px;
        text-transform: uppercase;
        text-align: center;
        margin:3.5rem 0 3.5rem 0;
        line-height: 1;
    }
    .list .list-wrapper  {
        list-style: none;
        margin:0 0.5rem;
        padding:0;
    }
    @media (max-width: 576px) and (orientation:portrait) {
        .lists {
            padding:0 1rem;
            margin-bottom:5rem;
        }
        .list .title {
            margin:1.5rem 1rem;
            font-size:1.5rem;
        }
    }
    `;
  }
}

// Register the element with the browser
customElements.define(ListItem.is, ListItem);
