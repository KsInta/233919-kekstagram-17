'use strict';

var commentsText = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var names = ['Пётр', 'Василий', 'Иван', 'Дарья', 'Алёна', 'Роман', 'Олег', 'Сергей', 'Андрей', 'Георгий', 'Антон'];

var PHOTOS_AMOUNT = 25;
var AVATARS_AMOUNT = 6;
var MIX_LIKES_AMOUNT = 15;
var MAX_LIKES_AMOUNT = 100;

var pictureBlock = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// случайное число в интервале
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

// новый массив на основе существующего
var getRandomArray = function (parentArray, minLength, maxLength) {
  var arrayCopy = parentArray.slice();
  var newArray = [];
  var newArrayLength = getRandomNumber(minLength, maxLength);

  for (var i = 0; i < newArrayLength; i++) {
    newArray.push(arrayCopy.splice(getRandomNumber(0, arrayCopy.length - 1), 1).join());
  }

  return newArray;
};

// случайный элемент массива
var getRandomArrayElement = function (array) {
  var randomElement = array[getRandomNumber(0, array.length - 1)];

  return randomElement;
};

// создание массива комментариев
var createComments = function (comments, namesArray) {
  var commentsArray = [];

  for (var i = 0; i < getRandomNumber(0, namesArray.length); i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(1, AVATARS_AMOUNT) + '.svg',
      message: getRandomArray(comments, 1, 2).join(' '),
      name: getRandomArrayElement(namesArray)
    };

    commentsArray.push(comment);
  }

  return commentsArray;
};

// создание массива фотографий
var createPhotos = function (photosAmount) {
  var photosArray = [];

  for (var i = 1; i <= photosAmount; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(MIX_LIKES_AMOUNT, MAX_LIKES_AMOUNT),
      comments: createComments(commentsText, names)
    };

    photosArray.push(photo);
  }

  return photosArray;
};

// шаблон фотографии
var createTemplate = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

// вставка фаблона в блок
var insertPhotoOnPage = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createTemplate(array[i]));
  }

  pictureBlock.appendChild(fragment);
};

// отрисовка на странице
insertPhotoOnPage(createPhotos());
