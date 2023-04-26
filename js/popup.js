const cards = document.getElementsByClassName('card');
const body = document.querySelector('body');
const modalIcons = document.getElementsByClassName('modal-icons');


for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        createModal(this);
        body.style.overflow = 'hidden';
        if (window.innerWidth <= 900) {
            window.scrollTo(0, 0);
        }


    });
}

function createModal(cardElement) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        
        <div class="modal-content">
        <div class="icon-close">
        <span class="close">&times</span>
        </div>
            ${cardElement.innerHTML}
            
        </div>
  
        
    `;
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function () {
        modal.remove();
        if (window.innerWidth <= 900) {
            body.style.overflow = 'auto';
            window.scrollTo(100)
        }
    });

    document.body.appendChild(modal);

    // Mettre à jour la position de la modal en fonction du défilement de la page
    const modalContent = modal.querySelector('.modal-content');
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY || window.pageYOffset;
        modalContent.style.top = scrollY + 'px';
    });

}
