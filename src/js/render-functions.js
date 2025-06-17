import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreButton = document.querySelector(".load-more-button");

let lightbox = null;

export const createGallery = (images) => {
  const markup = images.map((image) => {
    return `
      <li class="image-container">
        <a href="${image.largeImageURL}" class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="image-footer">
          <p><b>Likes</b>: ${image.likes}</p>
          <p><b>Views</b>: ${image.views}</p>
          <p><b>Comments</b>: ${image.comments}</p>
          <p><b>Downloads</b>: ${image.downloads}</p>
        </div>
      </li>
    `;
  }).join("");

  gallery.insertAdjacentHTML("beforeend", markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
};

export const clearGallery = () => {
  gallery.innerHTML = "";
};

export function showLoader() {
  loader.style.display = "block";
}

export function hideLoader() {
  loader.style.display = "none";
}

export function showLoadMoreButton() {
  loadMoreButton.style.display = "block";
}

export function hideLoadMoreButton() {
  loadMoreButton.style.display = "none";
}