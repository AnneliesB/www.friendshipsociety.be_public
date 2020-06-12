function loadSubmissionsPaginated() {
    const page = getUrlParameter('page') === '' ? 1 : getUrlParameter('page')
    const size = getUrlParameter('size') === '' ? 12 : getUrlParameter('size')
    storePagination(page, size);

    // send to backend
    fetch(`${api}/submissions?page=${page}&size=${size}`, {
            'method': 'get',
            'url': `${api}/submissions?page=${page}&size=${size}`,
            mode: 'cors', // no-cors, *cors, same-origin
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            localStorage.setItem('totalItems', response.count)

            if(response.count === 0 || !response.count > 0){
                document.querySelector('.teasers__container').insertAdjacentHTML('beforeend', `<p class="empty__state">Er heeft nog niemand je vriendenboek ingevuld. Deel nu je link met je vrienden.</p>`);
            } else {

                let colorClass= 1;
                for(let i = 0; i <= response.data.length; i++){
                    if(colorClass >5){
                        colorClass=1;
                    }
                    insertTeaser(response.data[i].items[0].answer, response.data[i].items[1].answer, response.data[i]._id, colorClass)
                    colorClass ++;
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function insertTeaser(name, description, id, colorClass) {
    const template = `
        <div class="card entries__teaser entries__teaser${colorClass}">
            <a href="detail?q=${id}">
                <div class="entries__teaser--content">
                    <p class="teaser__content--name">${name}</p>
                    <p class="teaser__content--description">${description.substr(0, 100)}</p>
                </div>
                <div class="entries__teaser--button">
                    <a href="detail?q=${id}"><i class="fas fa-chevron-right"></i></a>
                </div>
            </a>
        </div>`
    document.querySelector('.teasers__container').insertAdjacentHTML('beforeend', template);
}

loadSubmissionsPaginated()

document.querySelector('.btn__pagination--back').addEventListener('click', (e) => {
    const page = getUrlParameter('page') === '' ? 0 : parseInt(getUrlParameter('page')) - 1
    const size = getUrlParameter('size') === '' ? 12 : parseInt(getUrlParameter('size'))

    if (page !== 0 && page > 0) {
        storePagination(page, size);
        window.location.href = `/index?page=${page}&size=${size}`;
    }

})

document.querySelector('.btn__pagination--next').addEventListener('click', (e) => {
    let page = getUrlParameter('page') === '' ? 2 : parseInt(getUrlParameter('page')) + 1
    const size = getUrlParameter('size') === '' ? 12 : parseInt(getUrlParameter('size'))
    const maxPages = Math.ceil(parseInt(localStorage.getItem('totalItems')) / size)

    page <= 0 ? page = 1 : null

    if (page <= maxPages) {
        storePagination(page, size);
        window.location.href = `/index?page=${page}&size=${size}`;
    }
})

function disableButtons() {
    const page = getUrlParameter('page') === '' ? 1 : parseInt(getUrlParameter('page'))
    const size = getUrlParameter('size') === '' ? 12 : parseInt(getUrlParameter('size'))
    const maxPages = Math.ceil(parseInt(localStorage.getItem('totalItems')) / size)

    if (page === maxPages || page > maxPages) {
        document.querySelector('.btn__pagination--next').style.opacity = '0.5'
    }

    if (page === 1 || page < 0) {
        document.querySelector('.btn__pagination--back').style.opacity = '0.5'
    }
}

function storePagination(page, size){
    localStorage.setItem('pagination', `?page=${page}&size=${size}`)
}

disableButtons()