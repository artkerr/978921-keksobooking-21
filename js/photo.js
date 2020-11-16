'use strict';

const FILE_TYPES = [`image/gif`, `image/jpg`, `image/jpeg`, `image/png`];

const form = document.querySelector(`.ad-form`);
const userPhotoInput = form.querySelector(`.ad-form__field input[type=file]`);
const userPhotoPreview = form.querySelector(`.ad-form-header__preview img`);
const housePhotoInput = form.querySelector(`.ad-form__upload input[type=file]`);
const housePhotoPreview = form.querySelector(`.ad-form__photo img`);

const setPhoto = (input, preview) => {
  const file = input.files[0];
  const fileType = file.type;

  const matches = FILE_TYPES.some((type) => {
    return fileType === type;
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

userPhotoInput.addEventListener(`change`, () => {
  setPhoto(userPhotoInput, userPhotoPreview);
});

housePhotoInput.addEventListener(`change`, () => {
  setPhoto(housePhotoInput, housePhotoPreview);
});

window.resetPhoto = (preview) => {
  preview.src = `img/muffin-grey.svg`;
};

