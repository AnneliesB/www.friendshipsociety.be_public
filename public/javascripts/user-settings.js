function loadInfo() {
    // send to backend
    fetch(`${api}/users/me`, {
            'method': 'get',
            'url': `${api}/users/me`,
            mode: 'cors', // no-cors, *cors, same-origin
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            document.querySelector('#firstname').value = response.data.firstname;
            document.querySelector('#lastname').value = response.data.lastname;
            document.querySelector('#nickname').value = response.data.nickname;
            document.querySelector('#email').value = response.data.email;
        })
        .catch((err) => {
            console.log(err);
        })
}

loadInfo();

document.querySelector('.form__field--label--password').addEventListener('click', (e) => {
    document.querySelector('.popup__question--password').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
})

document.querySelector('.btn__popup__password--edit').addEventListener('click', (e) => {
    const currentPass = document.querySelector('#currentPassword').value;
    const newPass = document.querySelector('#newPassword').value;
    const confirmPass = document.querySelector('#confirmPassword').value;

    // check empty fields
    if (!currentPass || !newPass || !confirmPass) {
        document.querySelector('.error__container--popup').innerHTML = `<p>Gelieve geen velden leeg te laten.</p>`
    }

    // check matching passwords
    if (newPass !== confirmPass) {
        document.querySelector('.error__container--popup').innerHTML = `<p>Je wachtwoorden komen niet overeen.</p>`
    }

    if ((currentPass && newPass && confirmPass) && newPass === confirmPass) {
        fetch(`${api}/users/password/update`, {
                'method': 'put',
                'url': `${api}/users/password/update`,
                mode: 'cors', // no-cors, *cors, same-origin
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentPassword: currentPass,
                    newPassword: newPass,
                })
            })
            .then((result) => {
                return result.json();
            })
            .then((response) => {
                if (response.code !== 200) {
                    document.querySelector('.error__container--popup').innerHTML = `<p>Je huidig wachtwoord is incorrect</p>`
                } else {
                    document.querySelector('.error__container--main').innerHTML = `<p>Je wachtwoord werd geupdate!</p>`
                    hidePopups()
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
})

function hidePopups() {
    document.querySelector('.popup__question--password').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('#currentPassword').value = '';
    document.querySelector('#newPassword').value = '';
    document.querySelector('#confirmPassword').value = '';
}

document.querySelector('.btn__popup__password--cancel').addEventListener('click', (e) => {
    hidePopups()
})
document.querySelector('.overlay').addEventListener('click', (e) => {
    hidePopups()
})

document.querySelector('.btn__profile--edit').addEventListener('click', (e) => {
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const nickname = document.querySelector('#nickname').value;
    const email = document.querySelector('#email').value.toLowerCase();

    // check empty fields
    if (!firstname || !lastname || !email) {
        document.querySelector('.error__container--main').innerHTML = `<p>Gelieve geen velden leeg te laten.</p>`
    }

    if (firstname && lastname && email) {
        // send to backend
        fetch(`${api}/users/profile/update`, {
                'method': 'put',
                'url': `${api}/users/profile/update`,
                mode: 'cors', // no-cors, *cors, same-origin
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    nickname: nickname,
                    email: email,
                })
            })
            .then((result) => {
                return result.json();
            })
            .then((response) => {
                if (response.code === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    document.querySelector('.error__container--main').innerHTML = `<p>Je profiel werd geupdate!</p>`
                } else if (response.code === 409) {
                    document.querySelector('.error__container--main').innerHTML = `<p>Dit email adres is niet beschikbaar.</p>`
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
});