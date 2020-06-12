function loadQuestions() {
    // send to backend
    fetch(`${api}/questionaire/get/${getUrlParameter('q')}`, {
            'method': 'get',
            'url': `${api}/questionaire/get/${getUrlParameter('q')}`,
            mode: 'cors', // no-cors, *cors, same-origin
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            if (response.code === 200) {
                response.data.items.map((question) => {
                    insertFormField(question);
                })
            } else {
                console.log("failed");
                // show error: something went wrong
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function insertFormField(question) {
    const template = `
    <div class="form__field form__field--submission">
        <label class="form__field--label form__field--submission--label">${question}</label>
        <textarea class="form__field__submission--input" placeholder="Jouw antwoord"></textarea>
    </div>`
    document.querySelector('.form__submission').insertAdjacentHTML("beforeend", template);
}

loadQuestions();

document.querySelector('.questionaire__button--saveSubmission').addEventListener('click', (e) => {
    let formFields = document.querySelectorAll('.form__field--submission');
    let response = [];

    for (i = 0; i < formFields.length; i++) {
        let QA = {
            question: formFields[i].childNodes[1].innerHTML,
            answer: formFields[i].childNodes[3].value,
        }
        response.push(QA);
    }

    // send to backend
    fetch(`${api}/submissions/submit/${getUrlParameter('q')}`, {
            'method': 'POST',
            'url': `${api}/submissions/submit/${getUrlParameter('q')}`,
            mode: 'cors', // no-cors, *cors, same-origin
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                owner: getUrlParameter('q'),
                items: response,
            })
        })
        .then((result) => {
            return result.json();
        })
        .then((res) => {
            if (res.code === 200) {
                window.location.href = `/compleet`;
            } else {
                console.log("failed");
            }
        })
        .catch((err) => {
            console.log(err);
        })
});