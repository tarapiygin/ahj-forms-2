export default class ProductForm {
  constructor(element) {
    this.element = element;
    this.container = this.element.closest('.pop-up');
    this.fields = this.element.elements;
    this.resetButton = this.element.querySelector('.reset-button');
    this.errors = [];
    this.submitFormListeners = [];

    this.regitsterEvents();
  }

  showForm(name = '', price = '') {
    this.fields.name.value = name;
    this.fields.price.value = price;
    this.container.classList.add('pop-up_visible');
  }

  hideForm() {
    this.hideErrors();
    this.container.classList.remove('pop-up_visible');
  }

  vildate() {
    this.hideErrors();
    if (this.fields.name.value === '') {
      this.errors.push({
        key: 'name',
        text: 'Поле "Название" не может быть пустым',
      });
      return false;
    }
    if (this.fields.price.value === '') {
      this.errors.push({
        key: 'price',
        text: 'Поле "Стоимость" не может быть пустым',
      });
      return false;
    }
    if (Number.isNaN((Number.parseInt(this.fields.price.value, 10)))) {
      this.errors.push({
        key: 'price',
        text: 'Поле "Стоимость" должно содержать только числа',
      });
      return false;
    }
    return true;
  }

  showErrors() {
    this.errors.forEach((error) => {
      const errorEl = document.createElement('div');
      errorEl.classList.add('error');
      errorEl.innerText = error.text;
      this.fields[error.key].after(errorEl);
    });
  }

  hideErrors() {
    this.errors = [];
    const errorsEl = Array.from(this.element.getElementsByClassName('error'));
    errorsEl.forEach((element) => element.remove());
  }

  addSubmitFormListener(callback) {
    this.submitFormListeners.push(callback);
  }

  onSubmitForm(event) {
    event.preventDefault();
    if (this.vildate()) {
      const { name, price } = this.fields;
      this.hideForm();
      this.submitFormListeners.forEach((o) => o.call(null, name.value, price.value));
    } else this.showErrors();
  }

  onClickResetForm() {
    this.hideForm();
  }

  regitsterEvents() {
    this.element.addEventListener('submit', this.onSubmitForm.bind(this));
    this.resetButton.addEventListener('click', this.onClickResetForm.bind(this));
  }
}
