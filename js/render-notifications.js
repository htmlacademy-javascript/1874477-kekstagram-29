import { isEscapeKey } from './utils.js';

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successPopup.querySelector('.success__button');
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorPopup.querySelector('.error__button');

const onSuccessButtonClick = () => removeSuccessNotification();
const onSuccessOverlayClick = (evt) => !evt.target.closest('.success__inner') && removeSuccessNotification();
const onSuccessPopupEsc = (evt) => isEscapeKey(evt) && removeSuccessNotification();
const renderNotification = (element) => document.body.appendChild(element);
const onErrorButtonClick = () => removeErrorNotification();
const onErrorOverlayClick = (evt) => !evt.target.closest('.error__inner') && removeErrorNotification();
const onErrorPopupEsc = (evt) => isEscapeKey(evt) && removeErrorNotification();

const showSuccessPopup = () => {
  renderNotification(successPopup);
  document.addEventListener('keydown', onSuccessPopupEsc);
  successButton.addEventListener('click', onSuccessButtonClick);
  successPopup.addEventListener('click', onSuccessOverlayClick);
};

const showErrorPopup = () => {
  renderNotification(errorPopup);
  document.addEventListener('keydown', onErrorPopupEsc);
  errorButton.addEventListener('click', onErrorButtonClick);
  errorPopup.addEventListener('click', onErrorOverlayClick);
};

function removeSuccessNotification() {
  successPopup.remove();
  document.removeEventListener('keydown', onSuccessPopupEsc);
  successButton.removeEventListener('click', onSuccessButtonClick);
  successPopup.removeEventListener('click', onSuccessOverlayClick);
}

function removeErrorNotification() {
  errorPopup.remove();
  document.removeEventListener('keydown', onErrorPopupEsc);
  successButton.removeEventListener('click', onErrorButtonClick);
  successPopup.removeEventListener('click', onErrorOverlayClick);
}

export { showErrorPopup, showSuccessPopup };
