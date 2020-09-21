import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

export default class ProductManager {
  constructor() {
    this.form = new ProductForm(document.querySelector('#product-form'));
    this.table = new ProductTable(document.querySelector('#product-table'));
    this.createBtn = document.querySelector('.create-button');
    this.productList = [];
    this.currentProduct = null;
  }

  onClickCreateBtn() {
    this.form.showForm();
  }

  onClickDeleteBtn(name, price, index) {
    this.form.hideForm();
    this.productList.splice(index, 1);
    this.save();
    this.table.drawProductTable(this.productList);
  }

  onClickUpdateBtn(name, price, index) {
    this.currentProduct = this.productList[index];
    this.form.showForm(this.currentProduct.name, this.currentProduct.price);
  }

  onSubmitForm(name, price) {
    if (this.currentProduct !== null) {
      this.currentProduct.name = name;
      this.currentProduct.price = price;
      this.currentProduct = null;
    } else {
      this.productList.push({
        name,
        price: Number.parseInt(price, 10),
      });
    }
    this.save();
    this.table.drawProductTable(this.productList);
  }

  init() {
    this.registerEvents();
    this.load();
    this.table.drawProductTable(this.productList);
  }

  save() {
    localStorage.setItem('product-data', JSON.stringify(this.productList));
  }

  load() {
    const JSONdata = localStorage.getItem('product-data');
    if (JSONdata !== null) this.productList = JSON.parse(JSONdata);
  }

  registerEvents() {
    this.table.addClickDeleteBtnListener(this.onClickDeleteBtn.bind(this));
    this.table.addClickUpdateBtnListener(this.onClickUpdateBtn.bind(this));
    this.form.addSubmitFormListener(this.onSubmitForm.bind(this));
    this.createBtn.addEventListener('click', this.onClickCreateBtn.bind(this));
  }
}
