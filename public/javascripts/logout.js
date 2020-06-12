document.querySelector('.btn__logout').addEventListener('click', (e) => {
    localStorage.removeItem('user');
    // send to backend
    fetch(`${api}/users/logout`, {
            'method': 'POST',
            'url': `${api}/users/logout`,
            mode: 'cors', // no-cors, *cors, same-origin
            'headers': {
                'Content-Type': 'application/json'
            },
        })
        .then(() => {
            window.location.href = `/login`;
        })
        .catch((err) => {
            console.log(err);
        })
})

