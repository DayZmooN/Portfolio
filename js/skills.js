window.setInterval(function () {
    var matrix = $('#ic-search').css('transform').replace(/[^0-9\-.,]/g, '').split(',');
    var x = matrix[12] || matrix[4];
    var y = matrix[13] || matrix[5];
    x = Number(x) + 29.5;
    y = Number(y) + 29.5;
    $('#ic-search').css('transform', 'translate');
    $('#items').children('svg').each(function () {
        var svgX = $(this).css('left');
        var svgY = $(this).css('top');
        // console.log(svgY);
        svgX = Number(svgX.slice(0, svgX.length - 2)) + 10;
        svgY = Number(svgY.slice(0, svgY.length - 2)) + 10;
        var dist = Math.sqrt((x - svgX) * (x - svgX) + (y - svgY) * (y - svgY));
        // console.log(dist);
        if (dist < 20) {
            $(this).css('transform', 'scale(2)');
        } else {
            $(this).css('transform', 'scale(0.5)');
        }
    })
}, 10);

const stages = document.querySelectorAll('.stage');

stages.forEach(stage => {
    stage.innerHTML = `
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
  `;

    const layers = stage.querySelectorAll('.stage');
    layers.forEach((layer, index) => {
        const position = -1.5 * index;
        layer.style.transform = `rotateY(40deg) rotateX(33deg) translateZ(${position}px)`;

        if (index >= 9) {
            layer.style.webkitTextStroke = '3px rgba(0, 0, 0, 0.25)';
        }

        if (index >= 10) {
            layer.style.webkitTextStroke = '15px dodgerblue';
            layer.style.textShadow = '6px 0 6px #00366b, 5px 5px 5px #002951, 0 6px 6px #00366b';
        }

        if (index >= 11) {
            layer.style.webkitTextStroke = '15px #0077ea';
        }

        if (index === 0) {
            layer.style.webkitTextStroke = '17px rgba(0, 0, 0, 0.1)';
        }

        layer.innerHTML = `
      <div class="text">
        Pure<br>css!
      </div>
    `;
    });
});
