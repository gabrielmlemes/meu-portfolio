function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-theme'); // Verifica e altera a classe

  // Salva a preferência do tema no localStorage
  localStorage.setItem('darkModeEnabled', isDarkMode ? 'true' : 'false');
}

const darkmodeToggle = document.getElementById('darkmode-toggle');

// Verifica se existe uma preferência de tema salva no localStorage
const darkModePreference = localStorage.getItem('darkModeEnabled');

// Aplica o tema inicial com base na preferência salva, se existir
if (darkModePreference === 'true') {
  document.body.classList.add('dark-theme');
  darkmodeToggle.checked = true; // Marca o toggle como selecionado
} else {
  document.body.classList.remove('dark-theme');
  darkmodeToggle.checked = false; // Desmarca o toggle
}

darkmodeToggle.addEventListener('change', toggleTheme);
