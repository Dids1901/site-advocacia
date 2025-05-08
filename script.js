document.addEventListener('DOMContentLoaded', () => {
  // Manipulação de cliques nos blocos para rolagem suave
  document.querySelectorAll('.bloco').forEach(bloco => {
      bloco.addEventListener('click', (e) => {
          e.preventDefault(); // Impede o comportamento padrão do link
          const href = bloco.getAttribute('href');
          const [page, hash] = href.split('#');
          
          // Se estamos na mesma página (sobre.html) e há um hash
          if (window.location.pathname.includes(page) && hash) {
              const target = document.querySelector(`#${hash}`);
              if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
              }
          } else {
              // Redireciona para a página com o hash
              window.location.href = href;
          }
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modelos = ['modelo-1', 'modelo-2', 'modelo-3'];
  const barras = ['bar-1', 'bar-2', 'bar-3'];
  let currentIndex = 0;

  const updateModel = (index = null) => {
    if (index !== null) {
      currentIndex = index;
    }

    // Remove active and paused classes from all elements
    document.querySelectorAll('.icone-texto').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.imagem-modelo').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.progress-bar').forEach(el => {
      el.classList.remove('active', 'paused');
      // Reset animation by removing and re-adding the element's style
      const beforeStyle = el.style.animation;
      el.style.animation = 'none';
      el.offsetHeight; // Trigger reflow to reset animation
      el.style.animation = beforeStyle;
    });
    document.querySelectorAll('.titulo-item').forEach(el => el.classList.remove('active'));

    // Add active class to current model, bar, and title
    document.querySelectorAll(`.icone-texto.${modelos[currentIndex]}`).forEach(el => el.classList.add('active'));
    document.querySelector(`.imagem-modelo.${modelos[currentIndex]}`).classList.add('active');
    const activeBar = document.querySelector(`.progress-bar.${barras[currentIndex]}`);
    activeBar.classList.add('active');
    const tituloItems = document.querySelectorAll('.titulo-item');
    if (tituloItems[currentIndex]) {
      tituloItems[currentIndex].classList.add('active');
    } else {
      console.error(`Erro: .titulo-item na posição ${currentIndex} não encontrado`);
    }

    // Set up animationend listener for the active progress bar
    const nextIndex = (currentIndex + 1) % modelos.length;
    activeBar.addEventListener('animationend', () => {
      if (activeBar.classList.contains('active') && !activeBar.classList.contains('paused')) {
        updateModel(nextIndex);
      }
    }, { once: true });
  };

  // Initialize carousel
  updateModel();

  // Add click handlers for titles
  document.querySelectorAll('.titulo-item').forEach((titulo, index) => {
    titulo.addEventListener('click', () => {
      updateModel(index);
    });
  });

  // Add hover handlers to pause/resume animation
  document.querySelectorAll('.imagem-modelo').forEach(imagem => {
    imagem.addEventListener('mouseenter', () => {
      const activeBar = document.querySelector('.progress-bar.active');
      if (activeBar) {
        activeBar.classList.add('paused');
      }
    });
    imagem.addEventListener('mouseleave', () => {
      const activeBar = document.querySelector('.progress-bar.active');
      if (activeBar) {
        activeBar.classList.remove('paused');
      }
    });
  });
});