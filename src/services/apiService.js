const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '12163095-f5466ddad4a17af4f9341497c';

const fetchImages = async (searchQuery, page) => {
  const rawResult = await fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  if (!rawResult.ok) {
    throw rawResult;
  }

  const result = await rawResult.json();

  return result;
};

// import axios from 'axios';

// const fetchArticlesWithQuery = searchQuery => {
//   return axios
//     .get(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
//     .then(response => response.data.hits);
// };

// export default {
//   fetchArticlesWithQuery,
// };

export default fetchImages;
