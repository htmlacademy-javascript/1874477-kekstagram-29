import { createCardPhoto, PHOTO_COUNT } from './data.js';

const thumbnailsList = createCardPhoto(PHOTO_COUNT);
const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailFragment = document.createDocumentFragment();

const createThumbnails = () => {
  thumbnailsList.forEach((picture) => {
    const thumbnailItem = thumbnailTemplate.cloneNode(true);
    const thumbnailImg = thumbnailItem.querySelector('.picture__img');
    const thumbnailComments = thumbnailItem.querySelector('.picture__comments');
    const thumbnailLikes = thumbnailItem.querySelector('.picture__likes');

    thumbnailImg.src = picture.url;
    thumbnailImg.alt = picture.description;
    thumbnailComments.textContent = picture.comments.length;
    thumbnailLikes.textContent = picture.likes;
    thumbnailFragment.append(thumbnailItem);
  });
};

createThumbnails();

picturesContainer.append(thumbnailFragment);

export { thumbnailsList, picturesContainer };
