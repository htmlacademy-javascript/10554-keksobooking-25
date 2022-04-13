const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const adFormImagesChooser = document.querySelector('.ad-form__input');
const adImagesPreview = document.querySelector('.ad-form__photo');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const getAvatarPreviewDefault = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
};

adFormImagesChooser.addEventListener('change', () => {
  const fileItems = adFormImagesChooser.files;
  for(let i = 0; i < fileItems.length; i++) {
    const fileName = fileItems[i].name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const imageBlock = document.createElement('img');
      imageBlock.src = URL.createObjectURL(fileItems[i]);
      adImagesPreview.append(imageBlock);
    }
  }

});

const getImagesPreviewDefault = () => {
  adImagesPreview.innerHTML = '';
};

export {getAvatarPreviewDefault, getImagesPreviewDefault};
