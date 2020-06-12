function hidePopups() {
    document.querySelector('.popup__question--add').style.display = 'none';
    document.querySelector('.popup__question--edit').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}

let questionDisplay;
document.querySelector('.main__settings').addEventListener('click', (e) => {
    if (e.target.matches('.fa-ellipsis-h')) {
        let buttonContainer = e.target.parentElement.nextElementSibling;

        if (buttonContainer.style.display === 'flex') {
            buttonContainer.style.display = 'none';
        } else {
            buttonContainer.style.display = 'flex';
        }
    }

    // show edit popup
    if (e.target.matches('.btn__action--edit')) {
        questionDisplay = e.target.parentElement.previousElementSibling.childNodes[1];
        let question = questionDisplay.innerHTML;
        document.querySelector('.popup__textarea--edit').value = question;
        document.querySelector('.popup__question--edit').style.display = 'block';
        document.querySelector('.overlay').style.display = 'block';
    }

    // save edited question
    if (e.target.matches('.btn__popup--edit')) {
        if (document.querySelector('.popup__textarea--edit').value !== '') {
            questionDisplay.innerHTML = document.querySelector('.popup__textarea--edit').value;
        }
        hidePopups();
    }

    // cancel edit question
    if (e.target.matches('.btn__popup--cancel')) {
        hidePopups();
    }

    // delete question
    if (e.target.matches('.btn__action--delete')) {
        let questionContainer = e.target.parentElement.parentElement;
        questionContainer.remove()
    }

    // show add popup
    if (e.target.matches('.btn__action--add')) {
        document.querySelector('.popup__question--add').style.display = 'block';
        document.querySelector('.overlay').style.display = 'block';
    }

    // add question
    if (e.target.matches('.btn__popup--add')) {
        let question = document.querySelector('.popup__textarea--add').value;
        if (question !== '') {
            insertQuestion(question);
        }
        document.querySelector('.popup__textarea--add').value = '';
        hidePopups();
    }

    // cancel adding new question
    if (e.target.matches('.btn__popup--cancelAdd')) {
        document.querySelector('.popup__textarea--add').value = '';
        hidePopups();
    }

    // delete optional questions (create questionaire)
    if (e.target.matches('.questionaire__clear--button')) {
        let optionals = document.querySelectorAll('.question__container--optional');
        let questions = [];

        if (optionals.length > 0) {
            for (i = 0; i < optionals.length; i++) {
                questions.push(optionals[i].childNodes[1].childNodes[1].innerHTML);
                optionals[i].remove()
            }

            localStorage.setItem('optionals', questions);

            document.querySelector('.questionaire__about').innerHTML = `
        <p class="questionaire__about--description description">Hieronder vind je een aantal basisvragen. Je kan deze
            bewerken,
            verwijderen of toevoegen. Je kan er ook voor kiezen om zelf alle vragen op te stellen.</p>
        <p class="questionaire__quickAction--button questionaire__undo--button"><i class="fas fa-undo"></i></i>Gebruik alle basisvragen</p>
        `
        }
    }

    // delete optional questions (update questionaire)
    if (e.target.matches('.questionaire__update--clear')) {
        let optionals = document.querySelectorAll('.question__container--optional');
        let questions = [];

        for (i = 0; i < optionals.length; i++) {
            questions.push(optionals[i].childNodes[1].childNodes[1].innerHTML);
            optionals[i].remove()
        }

        localStorage.setItem('optionals', questions);

        document.querySelector('.questionaire__about').innerHTML = `
        <p class="questionaire__about--description description">Hieronder vind je een aantal basisvragen. Je kan deze
            bewerken,
            verwijderen of toevoegen. Je kan er ook voor kiezen om zelf alle vragen op te stellen.</p>
        <p class="questionaire__quickAction--button questionaire__update--undo"><i class="fas fa-undo"></i></i>Alle verwijderde vragen terugzetten</p>
        `
    }

    // reset base questions (create questionaire)
    if (e.target.matches('.questionaire__undo--button')) {
        let optionals = localStorage.getItem('optionals');
        let optionalsArray = optionals.split(',')

        for (let i = 0; i < optionalsArray.length; i++) {
            insertQuestion(optionalsArray[i]);
        }

        document.querySelector('.questionaire__about').innerHTML = `
        <p class="questionaire__about--description description">Hieronder vind je een aantal basisvragen. Je kan deze
            bewerken,
            verwijderen of toevoegen. Je kan er ook voor kiezen om zelf alle vragen op te stellen.</p>
        <p class="questionaire__quickAction--button questionaire__clear--button"><i class="fas fa-trash"></i>Verwijder alle basisvragen</p>
        `
    }

    // reset base questions (update questionaire)
    if (e.target.matches('.questionaire__update--undo')) {
        let optionals = localStorage.getItem('optionals');
        let optionalsArray = optionals.split(',')

        for (let i = 0; i < optionalsArray.length; i++) {
            insertQuestion(optionalsArray[i]);
        }

        document.querySelector('.questionaire__about').innerHTML = `
        <p class="questionaire__about--description description">Hieronder vind je een aantal basisvragen. Je kan deze
            bewerken,
            verwijderen of toevoegen. Je kan er ook voor kiezen om zelf alle vragen op te stellen.</p>
        <p class="questionaire__quickAction--button questionaire__update--clear"><i class="fas fa-trash"></i>Begin vanaf nul</p>
        `
    }

    // close all popups on overlay click
    if (e.target.matches('.overlay')) {
        hidePopups();
    }
})
