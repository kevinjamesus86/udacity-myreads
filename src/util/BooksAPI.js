const api = `https://udacity-reactnd-server.herokuapp.com/api/myreads`;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
  token = localStorage.token =
    `token.` + Date.now().toString(32) + Math.random().toString(32);
}

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const get = bookId =>
  fetch(`${api}/books/${bookId}`).then(res => res.json());

export const getAll = () =>
  fetch(`${api}/shelved-books`, {
    headers,
  }).then(res => res.json());

export const update = (book, shelf) =>
  fetch(`${api}/shelved-books/${book._id}`, {
    method: 'PATCH',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shelf,
    }),
  }).then(res => res.json());

export const search = (query, limit = 20) =>
  fetch(`${api}/books/search?query=${query}&limit=${limit}`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
