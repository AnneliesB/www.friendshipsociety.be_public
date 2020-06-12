function loadDetail() {
    fetch(`${api}/submissions/detail/${getUrlParameter('q')}`, {
            'method': 'get',
            'url': `${api}/submissions/detail/${getUrlParameter('q')}`,
            mode: 'cors', // no-cors, *cors, same-origin
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            for (let i = 0; i < response.data.current.items.length; i++) {
                if (i === 0) {
                    const nameTemplate = `<h2 class="submission__name">${response.data.current.items[i].answer}</h2>`;
                    document.querySelector('.display__container').insertAdjacentHTML('afterbegin', nameTemplate)
                } else {
                    const template = `
                    <div class="display">
                        <p class="display__question">${response.data.current.items[i].question}</p>
                        <p class="display__answer">${response.data.current.items[i].answer}</p>
                    </div>`
                    document.querySelector('.display__container').insertAdjacentHTML('beforeend', template)
                }
            }

            let buttonTemplate = `
            <a href="detail?q=${response.data.previous._id}" class="btn btn__pagination btn__pagination--back"><i class="fas fa-chevron-left"></i> vorige</a>
            <a href="detail?q=${response.data.next._id}" class="btn btn__pagination btn__pagination--next">volgende<i class="fas fa-chevron-right"></i></a>`

            document.querySelector('.pagination').innerHTML = buttonTemplate;
        })
        .catch((err) => {
            console.log(err);
        })
}

loadDetail()

document.querySelector('.btn__return--overview').addEventListener('click', (e) => {
    window.location.href = `/index${localStorage.getItem('pagination')}`;
})