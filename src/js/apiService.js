const BASE_URL = 'https://pixabay.com/api/';

const MY_KEY = '20897782-f4830aa419d01f6c9c7fb4934';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const response = await fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${MY_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    return await Promise.resolve(res.hits);
    // return res.hits;
  }

  //  Варіант без використання async/await

  // fetchImages() {
  //   return (
  //     fetch(
  //       `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${MY_KEY}`,
  //     )
  //       // .then(res => res.json())
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then(({ hits }) => {
  //         return hits;
  //       })
  //   );
  // }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
