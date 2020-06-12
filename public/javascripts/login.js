document.querySelector('.form__field--button').addEventListener('click', (e) => {
    const email = document.querySelector('#email').value.toLowerCase();
    const password = document.querySelector('#password').value;

    // check empty fields
    if (!email || !password) {
        document.querySelector('.error__container').innerHTML=`<p>Gelieve geen velden leeg te laten.</p>`
    }

    if (email && password) {
        // send to backend
        fetch(`${api}/users/login`, {
                'method': 'POST',
                'url': `${api}/users/login`,
                mode: 'cors', // no-cors, *cors, same-origin
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then((result) => {
                return result.json();
            })
            .then((response) => {
                if (response.code === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    window.location.href = `/index`;
                } else {
                    document.querySelector('.error__container').innerHTML=`<p>Oeps.. er ging iets mis.</p>`
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

});