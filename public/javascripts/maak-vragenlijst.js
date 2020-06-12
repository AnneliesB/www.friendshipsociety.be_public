document.querySelector('.questionaire__button--submit').addEventListener('click', (e) => {
    let questionContainers = document.querySelectorAll('.question__container');
    let questions = [];

    for (i = 0; i < questionContainers.length; i++) {
        if (i === 0 || i === 1) {
            questions.push(questionContainers[i].firstChild.firstChild.innerHTML);
        } else {
            questions.push(questionContainers[i].childNodes[0].childNodes[0].innerHTML);
        }
    }

    fetch(`${api}/questionaire/create`, {
            'method': 'POST',
            'url': `${api}/questionaire/create`,
            mode: 'cors',
            'headers': {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                questions: questions,
            })
        })
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            if (response.code === 200) {
                window.location.href = `/`;
            } else {
                console.log("failed");
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

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