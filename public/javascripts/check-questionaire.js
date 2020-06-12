function questionaireExists() {
    fetch(`${api}/questionaire/check`, {
            'method': 'get',
            'url': `${api}/questionaire/check`,
            mode: 'cors', // no-cors, *cors, same-origin
            'headers': {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin"
        })
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            if (response.code === 200 && response.data.initial === false ) {
                window.location.href = `/index`;
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

questionaireExists()