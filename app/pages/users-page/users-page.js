import {CellsPage} from '@cells/cells-page';
import {html} from 'lit-element';
import '@cells-components/cells-template-paper-drawer-panel';
import 'lodash/lodash.min.js';
import '../../elements/lit-elements/header-hack.js';
import '../../elements/lit-elements/ajax-hack.js';

class UsersPage extends CellsPage {
  static get is() {
    return 'users-page';
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
    #main-image{
    height: 0;
    overflow: hidden;
    background: red;
   -moz-animation: slide 1s ease 3.5s backwards;
   -webkit-animation: slide 1s ease 3.5s backwards;
   -o-animation: slide 1s ease 3.5s backwards;
   -ms-animation: slide 1s ease 3.5s backwards;
    animation: slide 1s ease 3.5s backwards;
}


@-moz-keyframes slide /* Firefox */
{
from {height: 500px;}
to {height: 0px;}
}

@-webkit-keyframes slide /* Safari and Chrome */
{
from {height: 500px;}
to {height: 0px;}
}

@-o-keyframes slide /* Opera */
{
from {background: red;}
to {background: yellow;}
}

@-ms-keyframes slide /* IE10 */
{
from {height: 500px;}
to {height: 0px;}
}

@keyframes slide
{
from {height: 500px;}
to {height: 0px;}
}

      `;
  }
}

window.customElements.define(UsersPage.is, UsersPage);
