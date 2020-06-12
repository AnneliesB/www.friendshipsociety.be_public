document.querySelector('.form__subLink--passwordReset').addEventListener('click', (e) => {
    document.querySelector('.popup__question--resetPassword').style.display = "block";
    document.querySelector('.overlay').style.display = "block";
})

document.querySelector('.btn__popup--edit').addEventListener('click', (e) => {
    const email = document.querySelector('.popup__textarea--resetPass').value.toLowerCase();
    if (!email) {
        document.querySelector('.error__container--popup').innerHTML = `<p>Gelieve geen velden leeg te laten.</p>`
    }

    if (email) {
        fetch(`${api}/users/request-password-reset`, {
                'method': 'POST',
                'url': `${api}/users/request-password-reset`,
                mode: 'cors', // no-cors, *cors, same-origin
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                })
            })
            .then((result) => {
                return result.json();
            })
            .then((response) => {
                if (response.code === 200) {
                    window.location.href = `/niet-meer-vergeten-he`;
                } else {
                    document.querySelector('.error__container--popup').innerHTML = `<p>Oeps.. er ging iets mis.</p>`
                }
            })
            .catch((err) => {
                document.querySelector('.error__container--popup').innerHTML = `<p>Oeps.. er ging iets mis.</p>`
            })
    }

})

document.querySelector('.btn__popup--cancel').addEventListener('click', (e) => {
    closeResetPasswordPopup()
})

document.querySelector('.overlay').addEventListener('click', (e) => {
    closeResetPasswordPopup()
})

function closeResetPasswordPopup() {
    document.querySelector('.popup__question--resetPassword').style.display = "none";
    document.querySelector('.overlay').style.display = "none";
}