export const getData = () =>
  fetch("http://jsonplaceholder.typicode.com/users")
    .then(response => response.json());
