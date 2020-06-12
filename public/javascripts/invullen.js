// fetch questions from this user in the database and insert 
function loadQuestions() {
    fetch(`${api}/questionaire/get/${getUrlParameter('q')}`, {
            'method': 'get',
            'url': `${api}/questionaire/get/${getUrlParameter('q')}`,
            mode: 'cors',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            if (response.code === 200) {
                document.querySelector('.submission__firstname').innerHTML=response.data.owner.firstname;
                response.data.items.map((question) => {
                    insertFormField(question);
                })
            } else {
                console.log("failed");
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

// inserts question and answer fields
function insertFormField(question) {
    const template = `
    <div class="form__field form__field--submission">
        <label class="form__field--label form__field--submission--label">${question}</label>
        <textarea class="form__field__submission--input" placeholder="Jouw antwoord"></textarea>
    </div>`
    document.querySelector('.form__submission').insertAdjacentHTML("beforeend", template);
}

let clicked = false;
// submits QA's to database
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

    if (clicked === false) {
        clicked = true;
        fetch(`${api}/submissions/submit/${getUrlParameter('q')}`, {
                'method': 'POST',
                'url': `${api}/submissions/submit/${getUrlParameter('q')}`,
                mode: 'cors',
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
                    clicked = false;
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
});



loadQuestions();