document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    const mailtoLink = `mailto:g.moreiralemess@gmail.com?subject=${name}&body=${message}`;
    window.location.href = mailtoLink;
  });