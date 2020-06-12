function loadQuestions() {
    fetch(`${api}/questionaire/get/${JSON.parse(localStorage.getItem('user'))._id}`, {
            'method': 'get',
            'url': `${api}/questionaire/get/${JSON.parse(localStorage.getItem('user'))._id}`,
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
                for (let i = 0; i < response.data.items.length; i++) {
                    if (i === 0 || i === 1) {
                        // insertBaseQuestion(response.data.items[i]);
                    } else {
                        insertQuestion(response.data.items[i]);
                    }
                }
            } else {
                console.log("failed");
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function insertQuestion(question) {
    const template = `
    <div class="card question__container question__container--optional">
        <div class="question__container--content">
            <p>${question}</p>
            <i class="fas fa-ellipsis-h"></i>
        </div>

        <div class="question__container--buttons">
            <button class="btn btn__action btn__action--question btn__action--question--primary btn__action--edit">bewerk</button>
            <button class="btn btn__action--question btn__action--question--secondary btn__action--delete">verwijder</button>
        </div>
    </div>
    `
    document.querySelector('.questionaire__questionList--button').insertAdjacentHTML("beforebegin", template);
}

function insertBaseQuestion(question) {
    const template = `
    <div class="card question__container">
        <div class="question__container--content">
            <p>${question}</p>
        </div>
    </div>
    `
    document.querySelector('.questionaire__questionList--button').insertAdjacentHTML("beforebegin", template);
}

document.querySelector('.questionaire__button--update').addEventListener('click', (e) => {
    document.querySelector('.error__container--main').innerHTML = ``

    let questionContainers = document.querySelectorAll('.question__container');
    let questions = [];

    for (i = 0; i < questionContainers.length; i++) {
        if (i === 0 || i === 1) {
            questions.push(questionContainers[i].firstChild.firstChild.innerHTML);
        } else {
            questions.push(questionContainers[i].childNodes[1].childNodes[1].innerHTML);
        }
    }

    fetch(`${api}/questionaire/update`, {
            'method': 'put',
            'url': `${api}/questionaire/update`,
            mode: 'cors',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questions: questions,
            })
        })
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            if (response.code === 200) {
                // window.location.href = `/index`;
                document.querySelector('.error__container--main').innerHTML = `<p>Je vragenlijst werd geupdate!</p>`
            } else {
                console.log("failed");
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

loadQuestions()