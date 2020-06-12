document.querySelector('.navigation__main--menu').addEventListener('click', () => {
    let links = document.querySelector('.navigation__links');

    if(links.style.display === 'flex'){
        links.style.display='none';
    } else {
        links.style.display='flex';
    }
})