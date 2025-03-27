export default class SortableTable {
  element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
    this.subElements = this.getSubElements(); 

  }

  createElement(template) {
    const element = document.createElement(`div`);
    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTableHeaderTemplate() {
    return this.headerConfig.map(({id, title, sortable}) => (
      `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" >
        <span>${title}</span>
    </div>`)).join('');
  }

  createTableBodyTemplate() {
    return this.data.map((item)=>
      (` <a href="/products/${item.id}" class="sortable-table__row">
${
        this.headerConfig.map(({ id, template }) => {
          if (template) {
            return template(item[id]);
          }
          return `<div class="sortable-table__cell">${item[id]}</div>`;
        }).join('')}
  </a>`)
  
    ).join('');
  }


  createTemplate() {
    return (
      `   <div data-element="productsContainer" class="products-list__container">
      <div class="sortable-table">
    <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.createTableHeaderTemplate()}
      </div>
      <div data-element="body" class="sortable-table__body">
      ${this.createTableBodyTemplate()}
      </div>
      <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
    </div>
    </div>`);
  }
  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  sort(field, param = 'asc') {
    const column = this.headerConfig.find(item => item.id === field);
    const sortType = column.sortType;
    const direction = param === 'asc' ? 1 : -1;
    this.data = this.data.sort((a, b) => {
      if (sortType === 'string') {
        return direction * a[field].localeCompare(b[field], ['ru', 'en'], { sensitivity: 'case', caseFirst: 'upper'});
      }     
      return direction * (a[field] - b[field]);
    });
    this.updateTableBody();

  }
  updateTableBody() {
    this.subElements.body.innerHTML = this.createTableBodyTemplate();
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    return result;
  }
}