'use strict';

(() => {
  const housingTypes = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const map = document.querySelector(`.map`);
  const photoTemplate = document.querySelector(`#photo`).content.querySelector(`img`);

  const getFeatures = (cardData, item) => {
    const featuresItem = document.createElement(`li`);
    featuresItem.classList.add(`popup__feature`, `popup__feature--${item}`);
    return featuresItem;
  };

  const getPhoto = (cardData) => {
    const fragment = document.createDocumentFragment();

    cardData.offer.photos.forEach((photo) => {
      const newPhoto = photoTemplate.cloneNode(true);
      newPhoto.src = photo;
      fragment.appendChild(newPhoto);
    });

    return fragment;
  };

  const renderCard = (cardData) => {
    const card = cardTemplate.cloneNode(true);
    const avatar = card.querySelector(`.popup__avatar`);
    const title = card.querySelector(`.popup__title`);
    const address = card.querySelector(`.popup__text--address`);
    const price = card.querySelector(`.popup__text--price`);
    const type = card.querySelector(`.popup__type`);
    const rooms = card.querySelector(`.popup__text--capacity`);
    const time = card.querySelector(`.popup__text--time`);
    const features = card.querySelector(`.popup__features`);
    const description = card.querySelector(`.popup__description`);
    const photos = card.querySelector(`.popup__photos`);

    avatar.src = cardData.author.avatar;
    title.textContent = cardData.offer.title;
    address.textContent = cardData.offer.address;
    price.textContent = `${cardData.offer.price}₽/ночь`;
    type.textContent = housingTypes[cardData.offer.type];
    rooms.textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
    time.textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
    features.innerHTML = ``;

    cardData.offer.features.forEach((item) => {
      const featuresItem = getFeatures(cardData, item);
      features.appendChild(featuresItem);
    });

    photos.innerHTML = ``;
    photos.appendChild(getPhoto(cardData));

    description.textContent = cardData.offer.description;

    return card;
  };

  const renderCardList = (card) => {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(renderCard(card));
    map.appendChild(fragment);
  };


  window.card = {
    renderCardList
  };

})();
