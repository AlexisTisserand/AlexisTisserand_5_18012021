class Api {
    fetchEndPoint(url) {
        return fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response.json()
        })
        .catch(err => {
            alert(err) 
        });
    }
}

export const api = new Api; 
