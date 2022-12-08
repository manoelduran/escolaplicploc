
async function fetchAPI(url, method, body) {
    console.log('body', body)
    return fetch(`http://localhost:3336${url}`, {method, body})

}

export { fetchAPI };