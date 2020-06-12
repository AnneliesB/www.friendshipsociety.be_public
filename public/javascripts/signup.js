document.querySelector('.form__field--button').addEventListener('click', (e) => {
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const nickname = document.querySelector('#nickname').value;
    const email = document.querySelector('#email').value.toLowerCase();
    const password = document.querySelector('#password').value;
    const passwordRepeat = document.querySelector('#passwordRepeat').value;

    // check empty fields
    if (!firstname || !lastname || !email || !password || !passwordRepeat) {
        document.querySelector('.error__container').innerHTML = `<p>Gelieve geen velden leeg te laten.</p>`
    }

    // check matching passwords
    if (password !== passwordRepeat) {
        document.querySelector('.error__container').innerHTML = `<p>Je wachtwoorden komen niet overeen.</p>`
    }

    if ((firstname && lastname && email && password && passwordRepeat) && (password === passwordRepeat)) {
        // send to backend
        fetch(`${api}/users/signup`, {
                'method': 'POST',
                'url': `${api}/users/signup`,
                mode: 'cors', // no-cors, *cors, same-origin
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    nickname: nickname,
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
                    window.location.href = `/maak-vragenlijst`;
                } else {
                    document.querySelector('.error__container').innerHTML = `<p>Oeps... er ging iets fout...</p>`
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
});