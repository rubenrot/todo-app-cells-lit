import {LitElement, html,} from 'lit-element';

export class AddItem extends LitElement {
  static get is() {
    return 'add-item';
  }

  // Declare properties
  static get properties() {
    return {
      todoList: {
        type: Array
      },
      todoItem: {
        type: String
      }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.todoItem = '';
  }


  handleKeyPress(e) {
    if (e.key === 'Enter') {
      //call add item function
      this.onAddItem();
    } else {
      this.todoItem = e.target.value;
    }

  }

  onAddItem() {
    if (this.todoItem.length > 0) {
      let storedTodoList = JSON.parse(localStorage.getItem('todo-list'));
      storedTodoList = storedTodoList === null ? [] : storedTodoList;
      console.log(storedTodoList);

      storedTodoList.push({
        id: new Date().valueOf(),
        item: this.todoItem,
        done: false
      });


      localStorage.setItem('todo-list', JSON.stringify(storedTodoList));
      this.dispatchEvent(new CustomEvent(
        'addItem',
        {
          bubbles: true,
          composed: true,
          detail: {
            todoList: storedTodoList
          }
        }));
      this.todoItem = '';
    }

  }


  render() {
    return html`
    <style>${this.constructor.shadyStyles}</style>
     <div class="container">
          <div class="add">
              <div class="header">
              <h1>Add new to do</h1>
                
              </div>
               <div class="input-container"> 
                      <input .value=${this.todoItem}
                      @keyup=${this.handleKeyPress} />
                      <button class="btn-enter" @click="${this.onAddItem}">Add Item</button>
                </div>
          </div>
    </div>`;
  }

  static get shadyStyles() {
    return `
    .add {
        position: fixed;
        left: 2rem;
        top: 2rem;
        bottom: 2rem;
        background: #004481;
        width:350px;
        padding:1.5rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        border-radius:1rem;
    }
    .add input {
        border:none;
        border-radius:4px;
        margin:0;
        padding:1rem 1rem 2rem 1rem;
        font-size:1rem;
        width:100%;
        display:block;
        background:#fff;
        resize: none;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .add input:focus {
        outline:none;
        box-shadow: 0 0 0 3px #0064FF, 0 0 0 6px rgba(255,255,255,0.5);
    }
    .add input:focus ~ .btn-enter {
        display:block;
    }
    .add .btn-enter {
        position: absolute;
        font-size:0.75rem;
        text-transform: uppercase;
        background:#fff;
        padding:0.375rem;
        line-height: 1;
        right:0.25rem;
        bottom:0.25rem;
        border:none;
        border-radius:0.25rem;
        color:#0064FF;
        font-weight: 700;
        cursor:pointer;
        letter-spacing: 0.5px
    }
    .add .btn-enter:hover {
        background:#0064FF;
        color:#fff;
    }
    add .btn-enter:focus, .add .btn-enter:active {
      display:block;
    }
    .input-container {
        position: relative;
        background:#c9ffc7;
        border-radius:5rem;
        display:flex;
        align-items:center;
    }
    .input-container .right-icon {
      border-radius:0.4rem;
      width:100%;
      max-width:2rem;
      height:2rem;
      background:#fff;
      color:rgba(106,101,99,0.75);
      line-height: 2;
      text-align: center;
      display:block;
      position: absolute;
      right:0.25rem;
      cursor:pointer;
    }
    .input-container .right-icon:hover {
      color:rgba(106,101,99,1);
      background:rgba(106,101,99,0.1);;
    }
    .header {
      text-align: center;
      color:#fff;
      padding:2rem 0;
    }
    .header h1 {
      padding:0;
      margin:0;
      line-height: 1;
      letter-spacing:3px;
      text-transform:uppercase;
    }
    @media (max-width: 576px) and (orientation:portrait) {
      .add {
        position: relative;
        width:auto;
        left:auto;
        right:auto;
        top:auto;
        bottom: auto;
        border-radius:0;
      }
      .add .header {
        padding:0 1rem 0.5rem 1rem;
      }
      .add .header h1 {
        font-size:1.5rem;
      }
    }

    @media (max-width: 992px) and (orientation:landscape) {
      .add {
        border-radius:0;
        left:0;
        bottom:0;
        top:0;
      }
    }
    `;
  }

}

// Register the element with the browser
customElements.define(AddItem.is, AddItem);
