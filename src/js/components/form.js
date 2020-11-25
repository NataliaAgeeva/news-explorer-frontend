/* eslint-disable no-param-reassign */
export default class Form {
  constructor(errors, form, submit) {
    this.form = form;
    this.errors = errors;
    this.submit = submit;
  }

  clearForm() {
    Object.keys(this.errors).forEach((item) => {
      this.errors[item].textContent = '';
    });
    this.form.elements.forEach((item) => {
      if (item.type !== 'button') {
        item.value = '';
      }
    });

    this.submit.classList.add('popup__button_disabled');
    this.submit.setAttribute('disabled', true);
  }
}
