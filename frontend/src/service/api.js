
async function fetchAPI(url, method, body) {

    return await fetch(`http://localhost:3336${url}`, {
        method: method,
        body: body,
    })

}

export { fetchAPI };