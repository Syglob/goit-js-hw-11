const axios = require('axios');
const searchParams = new URLSearchParams({
  key: '24724449-88d9116de610dc3b4f2226284',
  q: 'name',
  image_type: 'photo',
  per_page: '40',
  orientation: 'horizontal',
  safesearch: 'true',
});
//
export async function fetchPictures(name) {
  const url = `https://pixabay.com/api/?key=${searchParams.get(
    'key',
  )}&q=${name}&image_type=${searchParams.get('image_type')}&per_page=${searchParams.get(
    'per_page',
  )}&orientation=${searchParams.get('orientation')}&safesearch=${searchParams.get('safesearch')}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
