document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navigation ul li a');
  
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id');
        }
      });
  
      navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.parentElement.classList.add('active');
        }
      });
    });
  });
  