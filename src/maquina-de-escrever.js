document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.home-text > h3, .home-text > h2, .home-text > .typewriter');
    const texts = Array.from(elements).map(element => element.textContent.trim());
    elements.forEach(element => element.textContent = '');

    let index = 0;

    function type() {
        if (index < texts.length) {
            const currentElement = elements[index];
            const text = texts[index];
            currentElement.textContent += text.charAt(currentElement.textContent.length);
            if (currentElement.textContent.length < text.length) {
                setTimeout(type, 70);
            } else {
                index++;
                setTimeout(type, 500); // Pausa maior entre os elementos
            }
        }
    }

    type();
});
