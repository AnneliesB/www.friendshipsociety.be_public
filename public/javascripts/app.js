class App {
    fetchQuestions() {
        fetch(`https://vriendenboek2.herokuapp.com/combination/5ea57206c96e2bc99fae0e55`, {
                method: 'get',
                mode: 'cors',
                url: 'https://vriendenboek2.herokuapp.com/combination/5ea57206c96e2bc99fae0e55',
                'Access-Control-Allow-Origin': 'https://vriendenboek2.herokuapp.com',
                'headers': {
                    'Content-Type': 'application/json',
                }
            })
            .then((result) => {
                // return result ? JSON.parse(result) : {}
                return result.json();
            })
            .then((result) => {
                console.log('result', result);
            })
    }
}

const app = new App();
app.fetchQuestions();