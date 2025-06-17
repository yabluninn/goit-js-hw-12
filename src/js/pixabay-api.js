import axios from 'axios';

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

let perPage = 15;

export const getImagesByQuery = async (query, page) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=50871412-165a861e59de274a11f9f1fdc&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);

    const { hits, totalHits } = response.data;

    if (hits.length === 0) {
      iziToast.error({
        message: 'Sorry, no images found. Try another search.',
      });
      return { hits: [], totalHits: 0 };
    }

    return { hits, totalHits };
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
    return { hits: [], totalHits: 0 };
  }
}