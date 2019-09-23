import {LitElement, html,} from 'lit-element';
import '../../elements/lit-elements/table-hack.js';
import 'lodash/lodash.min.js';

class AjaxHack extends LitElement {
  static get is() {
    return 'ajax-hack';
  }

  // Declare properties
  static get properties() {
    return {
      users: {
        type: Array
      },
      data: {
        type: Array
      },
      conf: {
        type: Array
      }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.users = [];
    // Data from api
    this.data = [];
    // Conf to set order of column and visibility (can be dynamically)
    this.conf = [
      {property: 'name', header: 'Nombre', hidden: false},
      {property: 'username', header: 'Nick', hidden: false},
      {property: 'email', header: 'Email', hidden: false},
      {property: 'website', header: 'Website', hidden: false},
      {property: 'city', header: 'Ciudad', hidden: false},
      {property: 'street', header: 'Calle', hidden: false}
    ];
  }

  firstUpdated() {
    super.firstUpdated();

    fetch('http://jsonplaceholder.typicode.com/users')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        //this.users = res;
        res.map((user) => {
          this.data.push({
            name: user.name,
            username: user.username,
            email: user.email,
            website: user.website,
            city: user.address.city,
            street: user.address.street,
          });
        });

        this.data = _.clone(this.data);
      });
  }

  /*
  ${this.users.map((user) => {
  return html`<h3>${user.name}</h3>
                                <p>${user.username}</p>
                                <br>`;
})
  }
   */

  render() {

    return html`
    <style>${this.constructor.shadyStyles}</style>
		<table-hack ?stickyHeader="${true}" .data="${this.data}" .conf="${this.conf}">
		  
    </table-hack>`;
  }


  static get shadyStyles() {
    return ``;
  }
}

// Register the element with the browser
customElements.define(AjaxHack.is, AjaxHack);
