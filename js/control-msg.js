const serverErrorTemplate = document.querySelector('#server-error').content.querySelector('.server-error');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
const mainBody = document.querySelector('body');

const closeClickMessagePopup = (target) => {
  target.addEventListener('click', (evt) => {
    if (evt.target === target || evt.target.matches('.error__button')) {
      target.classList.remove('active');
      mainBody.removeChild(target);
    }
  }, {once: true});
};

const closeEsckMessagePopup = (target) => {
  document.addEventListener('keydown', (evt) => {
    if(target.classList.contains('active')){
      if (evt.key === 'Escape') {
        target.classList.remove('active');
        mainBody.removeChild(target);
      }
    }
  }, {once: true});
};

const onErrorGetServer = () => {
  const popupElement = serverErrorTemplate.cloneNode(true);
  mainBody.append(popupElement);
  popupElement.classList.add('active');
  closeClickMessagePopup(popupElement);
  closeEsckMessagePopup(popupElement);
};

const onSuccessPost = () => {
  const popupElement = successPopupTemplate.cloneNode(true);
  mainBody.append(popupElement);
  popupElement.classList.add('active');
  closeClickMessagePopup(popupElement);
  closeEsckMessagePopup(popupElement);
};

const onErrorPost = () => {
  const popupElement = errorPopupTemplate.cloneNode(true);
  mainBody.append(popupElement);
  popupElement.classList.add('active');
  closeClickMessagePopup(popupElement);
  closeEsckMessagePopup(popupElement);
};

export {onErrorGetServer, onSuccessPost, onErrorPost};
