
async function fetchAPI(url, method) {
    return fetch(`http://localhost:3336${url}`, {method})

}

export { fetchAPI };