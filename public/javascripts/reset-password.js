document.querySelector('.form__field--button').addEventListener('click', (e) => {
    const email = document.querySelector('#email').value.toLowerCase();
    const temporaryPassword = document.querySelector('#temporaryPassword').value;
    const newPassword = document.querySelector('#newPassword').value;
    const confirmNewPassword = document.querySelector('#confirmNewPassword').value;

    if (!email || !temporaryPassword || !newPassword || !confirmNewPassword) {
        document.querySelector('.error__container').innerHTML = `<p>Gelieve geen velden leeg te laten.</p>`
    }

    if (newPassword !== confirmNewPassword) {
        document.querySelector('.error__container').innerHTML = `<p>Je wachtwoorden komen niet overeen.</p>`
    }

    if ((email && temporaryPassword && newPassword && confirmNewPassword) && (newPassword === confirmNewPassword)) {
        fetch(`${api}/users/reset-password`, {
                'method': 'POST',
                'url': `${api}/users/reset-password`,
                mode: 'cors', // no-cors, *cors, same-origin
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    temporaryPassword: temporaryPassword,
                    newPassword: newPassword,
                })
            })
            .then((result) => {
                return result.json();
            })
            .then((response) => {
                if (response.code === 200) {
                    window.location.href = `/profiel`;
                } else {
                    document.querySelector('.error__container').innerHTML = `<p>Oeps.. er ging iets mis.</p>`
                }
            })
            .catch((err) => {
                document.querySelector('.error__container').innerHTML = `<p>Oeps.. er ging iets mis.</p>`
            })
    }
})