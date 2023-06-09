export {fetchBreeds, fetchCatByBreed}; 

const BASE_URL = 'https://api.thecatapi.com/v1';
const MY_API_KEY = 'live_sFfPu4oQVbOkx6QxuLNkWFUEF8SqQ5BUgNaHBlL4GfoJqhDEFiyJEey8Eci89MBL';
const options = {
    headers: {
        'x-api-key': MY_API_KEY,
    },
};

function fetchBreeds() {
    const url = `${BASE_URL}/breeds`;
    return fetch(url, options)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
};

function fetchCatByBreed(breedId) {
    const urlId = `${BASE_URL}/images/search?limit=1&breed_ids=${breedId}`;
    return fetch(urlId, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
};

