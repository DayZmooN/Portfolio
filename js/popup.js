const cards = document.getElementsByClassName('card');
const body = document.querySelector('body');


for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        createModal(this);
        body.style.overflow = 'hidden';
    });

}

function createModal(cardElement) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <span class="close">&times</span>
        <div class="modal-content">
            ${cardElement.innerHTML}
        </div>
    `;
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function () {
        modal.remove();

    });
    // body.addEventListener('click', () => {
    //     modal.remove();
    // })

    document.body.appendChild(modal);
}




