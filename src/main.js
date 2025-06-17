import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';

const form = document.querySelector(".form");
const input = document.querySelector(".search-input");
const loadMoreButton = document.querySelector(".load-more-button");

let page = 1;
let latestQuery = "";
let totalAvailable = 0;
const perPage = 15;

hideLoadMoreButton();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = input.value.trim();

  if (query === "") return;
  showLoader();

  if (query !== latestQuery) {
    latestQuery = query;
    clearGallery();
    page = 1;
  }

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    totalAvailable = totalHits;

    if (hits.length > 0) {
      createGallery(hits);
      page++;

      if ((page - 1) * perPage >= totalAvailable) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        showLoadMoreButton();
      }
    }
  } catch (err) {
    console.error("Error loading images:", err);
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener("click", async () => {
  showLoader();

  try {
    const { hits } = await getImagesByQuery(latestQuery, page);

    if (hits.length > 0) {
      createGallery(hits);
      page++;

      smoothScroll();

      if ((page - 1) * perPage >= totalAvailable) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  } catch (err) {
    console.error("Error loading images:", err);
  } finally {
    hideLoader();
  }
})

function smoothScroll() {
  const firstCard = document.querySelector(".gallery .image-container");
  if (firstCard) {
    const { height } = firstCard.getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      behavior: "smooth",
    });
  }
}
