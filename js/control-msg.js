const serverErrorTemplate = document.querySelector('#server-error').content.querySelector('.server-error');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

const closeClickMsgPopup = (target) => {
  target.addEventListener('click', (evt) => {
    if (evt.target === target || evt.target.matches('.error__button')) {
      target.classList.remove('active');
      document.querySelector('body').removeChild(target);
    }
  }, {once: true});
};

const closeEsckMsgPopup = (target) => {
  document.addEventListener('keydown', (evt) => {
    if(target.classList.contains('active')){
      if (evt.key === 'Escape') {
        target.classList.remove('active');
        document.querySelector('body').removeChild(target);
      }
    }
  }, {once: true});
};

const onErrorGetServer = () => {
  const popupElement = serverErrorTemplate.cloneNode(true);
  document.querySelector('body').append(popupElement);
  popupElement.classList.add('active');
  closeClickMsgPopup(popupElement);
  closeEsckMsgPopup(popupElement);
};

const onSuccessSubmit = () => {
  const popupElement = successPopupTemplate.cloneNode(true);
  document.querySelector('body').append(popupElement);
  popupElement.classList.add('active');
  closeClickMsgPopup(popupElement);
  closeEsckMsgPopup(popupElement);
};

const onErrorSubmit = () => {
  const popupElement = errorPopupTemplate.cloneNode(true);
  document.querySelector('body').append(popupElement);
  popupElement.classList.add('active');
  closeClickMsgPopup(popupElement);
  closeEsckMsgPopup(popupElement);
};

export {onErrorGetServer, onSuccessSubmit, onErrorSubmit};
