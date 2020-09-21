export default class ProductTabel {
  constructor(element) {
    this.element = element;
    this.clickDeleteBtnListeners = [];
    this.clickUpdateBtnListeners = [];
  }

  static renderTableBody(data) {
    let HTML = `<tr>
    <th class="product-table_header">Название</th>
    <th class="product-table_header">Стоимость</th>
    <th class="product-table_header">Действия</th>
  </tr>`;
    data.forEach((product, index) => {
      HTML += `<tr data-name=${product.name} data-price=${product.price} data-index=${index}>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>
        <button type="button" class="btn update-button">✎</button>
        <button type="button" class="btn delete-button">X</button>
      </td>
      </tr>`;
    });
    return HTML;
  }

  drawProductTable(data) {
    const HTML = ProductTabel.renderTableBody(data);
    this.element.innerHTML = HTML;
    this.registerEvents();
  }

  addClickDeleteBtnListener(callback) {
    this.clickDeleteBtnListeners.push(callback);
  }

  addClickUpdateBtnListener(callback) {
    this.clickUpdateBtnListeners.push(callback);
  }

  onClickDeleteBtn(event) {
    const currentTr = event.currentTarget.closest('tr');
    const { name, price, index } = currentTr.dataset;
    this.clickDeleteBtnListeners.forEach((o) => o.call(null, name, price, index));
  }

  onClickUpdateBtn(event) {
    const currentTr = event.currentTarget.closest('tr');
    const { name, price, index } = currentTr.dataset;
    this.clickUpdateBtnListeners.forEach((o) => o.call(null, name, price, index));
  }

  registerEvents() {
    for (const btn of this.element.getElementsByClassName('update-button')) {
      btn.addEventListener('click', this.onClickUpdateBtn.bind(this));
    }
    for (const btn of this.element.getElementsByClassName('delete-button')) {
      btn.addEventListener('click', this.onClickDeleteBtn.bind(this));
    }
  }
}
