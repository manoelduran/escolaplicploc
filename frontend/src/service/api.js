
 async function fetchAPI(url) {
    const response = await  fetch(`http://192.168.15.10:3336${url}`).json()
    console.log('response', response)
    return response
  
}

export {fetchAPI};