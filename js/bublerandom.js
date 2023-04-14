const container = document.querySelector('body');
const background = document.querySelector('main');

// Définir les valeurs de décalage pour ralentir le mouvement
const DECELERATION_X = 0.05;
const DECELERATION_Y = 0.05;

container.addEventListener('mousemove', (event) => {
    // Récupérer la position de la souris par rapport au conteneur
    const mouseX = event.clientX - container.offsetLeft;
    const mouseY = event.clientY - container.offsetTop;

    // Calculer la nouvelle valeur de background-position en fonction de la position de la souris avec décalage pour ralentir le mouvement
    const newX = (mouseX / container.offsetWidth) * 100 * DECELERATION_X;
    const newY = (mouseY / container.offsetHeight) * 100 * DECELERATION_Y;

    // Appliquer la nouvelle valeur de background-position à l'arrière-plan
    background.style.backgroundPosition = `${newX}% ${newY}%`;
});
