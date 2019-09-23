import { LitElement, html, css } from 'lit-element';

import { render } from 'lit-html';

class TableHack extends LitElement {
  static get styles() {
    const mainStyle = css`
    :host {
    display: block;
    }
    
    slot {
    display: none;
    }
    
*{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
h2{
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    padding: 30px 0;
}

/* Table Styles */

.table-wrapper{
    font-family: "Helvetica";
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    font-family: "Helvetica";
    font-size: 14px;
    border-radius: 5px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 14px;
}

.fl-table thead th {
    color: #ffffff;
    background: #4FC3A1;
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}

.fl-table tr:nth-child(even) {
    background: #F8F8F8;
}

/* Responsive */

@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}
      `;

    return [mainStyle];
  }

  render() {
    return html`
      <slot></slot>
       <div class="table-wrapper">
         <table class="fl-table">
        <thead></thead>
        <tbody></tbody>
      </table>
      </div>
       
    
      
    `;
  }

  static get is() { return 'table-hack'; }

  static get properties() {
    return {
      data: { type: Array },
      conf: { type: Array },
      table: { type: Array },
      headers: { type: Array },
      stickyHeader: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.table = [];
    this.headers = [];
  }

  updated(properties) {
    // Data or conf change we have to generate the table
    if (properties.has('data') || properties.has('conf')) {
      this.generateData();
    }
  }

  firstUpdated() {
    const assignedNodes = this.shadowRoot.querySelector('slot').assignedNodes();
    this.datatableColumns = new Map(assignedNodes
      .filter(a => a.tagName === 'LIT-DATATABLE-COLUMN' && a.column)
      .map(a => [a.property, a]));
    this.datatableHeaders = new Map(assignedNodes
      .filter(a => a.tagName === 'LIT-DATATABLE-COLUMN' && a.header)
      .map(a => [a.property, a]));
  }

  renderCell(item, td, confProperty, { currentTarget }) {
    const otherProperties = this.getOtherValues(currentTarget, item);
    if (currentTarget && currentTarget.html) {
      render(currentTarget.html(
        this.extractData(item, currentTarget.property), otherProperties,
      ), td);
    } else if (currentTarget) {
      render(this.extractData(item, currentTarget.property), td);
    } else if (confProperty) {
      render(this.extractData(item, confProperty), td);
    }
  }

  setEventListener(datatableColumn, lineIndex, item, td, property) {
    if (datatableColumn) {
      if (datatableColumn.eventsForDom[lineIndex]) {
        datatableColumn.removeEventListener('html-changed', datatableColumn.eventsForDom[lineIndex]);
      }
      datatableColumn.eventsForDom[lineIndex] = this.renderCell.bind(this, item, td, property);
      datatableColumn.addEventListener('html-changed', datatableColumn.eventsForDom[lineIndex]);
    }
  }

  getOtherValues(datatableColumn, item) {
    let otherProperties = {};
    if (datatableColumn && datatableColumn.otherProperties) {
      otherProperties = datatableColumn.otherProperties.reduce((obj, key) => {
        obj[key] = item[key];
        return obj;
      }, {});
    }
    return otherProperties;
  }

  renderHtml(conf, lineIndex, item, td, tr) {
    const { property } = conf;
    const datatableColumn = this.datatableColumns.get(property);
    this.setEventListener(datatableColumn, lineIndex, item, td, property);
    this.renderCell(item, td, property, { currentTarget: datatableColumn });
    tr.appendChild(td);
  }

  cleanEventsOfTr(item) {
    item.events.forEach(event => item.element.removeEventListener(event.type, event.event));
  }

  createEventsOfTr(tr, item) {
    const trOverEvent = this.trHover.bind(this, item);
    const trOutEvent = this.trOut.bind(this, item);
    tr.addEventListener('mouseover', trOverEvent);
    tr.addEventListener('mouseout', trOutEvent);
    return [{ type: 'mouseover', event: trOverEvent }, { type: 'mouseout', event: trOutEvent }];
  }

  cleanTrElements() {
    const splices = this.table.splice(this.data.length);

    splices.forEach(line => {
      this.cleanEventsOfTr(line);
      line.element.parentNode.removeChild(line.element);
    });
  }

  cleanTdElements() {
    [...this.table].forEach((line, lineNumber) => {
      line.columns.forEach((column, columnNumber) => {
        if (columnNumber <= (this.lastConfSize - 1)) {
          line.element.removeChild(column);
          this.table[lineNumber].columns.splice(columnNumber, 1);
        }
      });
    });
  }

  updateHeaders(confs) {
    let tr = this.shadowRoot.querySelector('table thead tr');
    if (!tr) {
      tr = document.createElement('tr');
    }
    if (this.lastConfSize > confs.length) {
      [...this.headers].forEach((header, i) => {
        if (i <= (this.lastConfSize - 1)) {
          tr.removeChild(header);
          this.headers.splice(i, 1);
        }
      });
    }
    confs.forEach((conf, i) => {
      const { property } = conf;
      const datatableHeader = this.datatableHeaders.get(property);
      let th;
      if (this.headers[i]) {
        th = this.headers[i];
      } else {
        th = document.createElement('th');
        if (this.stickyHeader) {
          th.classList.add('sticky');
        }
        this.headers.push(th);
      }
      if (datatableHeader && datatableHeader.columnStyle) {
        th.setAttribute('style', datatableHeader.columnStyle);
      } else {
        th.setAttribute('style', '');
      }
      if (datatableHeader && datatableHeader.html) {
        render(datatableHeader.html(conf.header, datatableHeader.property), th);
      } else {
        render(conf.header, th);
      }
      tr.appendChild(th);
    });
    this.shadowRoot.querySelector('thead').appendChild(tr);
  }

  trCreated(tr, lineIndex, item) {
    this.dispatchEvent(new CustomEvent('tr-create', { detail: { tr, lineIndex, item } }));
  }

  trHover(item) {
    this.dispatchEvent(new CustomEvent('tr-mouseover', { detail: item }));
  }

  trOut(item) {
    this.dispatchEvent(new CustomEvent('tr-mouseout', { detail: item }));
  }

  createTr(lineIndex, item) {
    const tr = document.createElement('tr');
    if (!this.table[lineIndex]) {
      this.table[lineIndex] = { element: tr, columns: [], events: this.createEventsOfTr(tr, item) };
    }
    return tr;
  }

  createTd(lineIndex) {
    const td = document.createElement('td');
    this.table[lineIndex].columns.push(td);
    return td;
  }

  updateBody(confs) {
    if (this.data !== undefined) {
      if (this.lastConfSize > confs.length) {
        this.cleanTdElements();
      }
      if (this.lastDataSize > this.data.length) {
        this.cleanTrElements();
      }
      this.data.forEach((item, lineIndex) => {
        let tr;
        if (this.table[lineIndex]) {
          this.cleanEventsOfTr(this.table[lineIndex]);
          tr = this.table[lineIndex].element;
          this.table[lineIndex].events = this.createEventsOfTr(tr, item);
        } else {
          tr = this.createTr(lineIndex, item);
        }

        this.trCreated(tr, lineIndex, item);

        confs.forEach((conf, columnIndex) => {
          let td;
          if (this.table[lineIndex].columns[columnIndex]) {
            td = this.table[lineIndex].columns[columnIndex];
          } else {
            td = this.createTd(lineIndex);
          }

          const datatableColumn = this.datatableColumns.get(conf.property);
          if (datatableColumn && datatableColumn.columnStyle) {
            td.setAttribute('style', datatableColumn.columnStyle);
          } else {
            td.setAttribute('style', '');
          }

          this.renderHtml(conf, lineIndex, item, td, tr);
        });
        this.shadowRoot.querySelector('tbody').appendChild(tr);
      });
    }
  }

  setLoading(loading) {
    this.dispatchEvent(new CustomEvent('loading', { detail: { value: loading } }));
  }

  async generateData() {
    this.setLoading(true);
    await this.updateComplete;
    if (this.debounceGenerate) {
      clearTimeout(this.debounceGenerate);
    }
    this.debounceGenerate = setTimeout(() => {
      const confs = [...this.conf].filter(c => !c.hidden);
      this.updateHeaders(confs);
      this.updateBody(confs);
      if (this.data !== undefined) {
        this.lastDataSize = this.data.length;
        this.lastConfSize = confs.length;
      }
      this.setLoading(false);
    });
  }

  extractData(item, columnProperty) {
    if (columnProperty) {
      const splittedProperties = columnProperty.split('.');
      if (splittedProperties.length > 1) {
        return splittedProperties.reduce((prevRow, property) => {
          if (typeof prevRow === 'string' && item[prevRow] !== undefined && item[prevRow][property] !== undefined) {
            return item[prevRow][property];
          }

          return prevRow[property] || '';
        });
      }
      return item[columnProperty];
    }
    return null;
  }
}

window.customElements.define(TableHack.is, TableHack);
