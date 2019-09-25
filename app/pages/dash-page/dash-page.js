import {CellsPage} from '@cells/cells-page';
import {html} from 'lit-element';
import '@cells-components/cells-template-paper-drawer-panel';
import '../../elements/lit-elements/add-item.js';
import 'lodash/lodash.min.js';

var voiceText = '';
var recognition;
var recognizing = false;
if (!('webkitSpeechRecognition' in window)) {
  alert("¡API no soportada!");
} else {

  recognition = new webkitSpeechRecognition();
  recognition.lang = "es-VE";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function () {
    recognizing = true;
    console.log("empezando a eschucar");
  };
  recognition.onresult = function (event) {

    for (var i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        //console.log(event.results[i][0].transcript);
        voiceText += event.results[i][0].transcript;
        //document.getElementById("texto").value += event.results[i][0].transcript;
      }

    }

    //console.log(voiceText);
    sessionStorage.setItem('my-text', voiceText);

    //texto
  };
  recognition.onerror = function (event) {
  };
  recognition.onend = function () {
    recognizing = false;
    //document.getElementById("procesar").innerHTML = "Escuchar";
    console.log("terminó de eschucar, llegó a su fin");

  }


}

class DashPage extends CellsPage {
  static get is() {
    return 'dash-page';
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

  procesar() {
    console.log('Procesando');

    if (recognizing == false) {
      recognition.start();
      recognizing = true;
      //document.getElementById("procesar").innerHTML = "Detener";
    } else {
      recognition.stop();
      recognizing = false;
      console.log(sessionStorage.getItem('my-text'));
      //  document.getElementById("procesar").innerHTML = "Escuchar";
    }
  }

  render() {
    return html`
    <style>${this.constructor.shadyStyles}</style>
      
     <cells-template-paper-drawer-panel header-hidden="" state="active">
          <div slot="app__header" class="my-header">
          </div>
          <div slot="app__main" class="todo-app-container">
            <div>
              <div>
               
                <button @click="${this.procesar}">Hablar</button>
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

window.customElements.define(DashPage.is, DashPage);
