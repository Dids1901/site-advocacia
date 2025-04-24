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
  let intervalId = null;

  const updateModel = () => {
    // Remove classe active de todos
    document.querySelectorAll('.icone-texto').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.imagem-modelo').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.progress-bar').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.titulo-item').forEach(el => el.classList.remove('active'));

    // Adiciona classe active ao modelo, barra e título atuais
    document.querySelector(`.icone-texto.${modelos[currentIndex]}`).classList.add('active');
    document.querySelector(`.imagem-modelo.${modelos[currentIndex]}`).classList.add('active');
    document.querySelector(`.progress-bar.${barras[currentIndex]}`).classList.add('active');
    const tituloItems = document.querySelectorAll('.titulo-item');
    if (tituloItems[currentIndex]) {
      tituloItems[currentIndex].classList.add('active');
    } else {
      console.error(`Erro: .titulo-item na posição ${currentIndex} não encontrado`);
    }

    // Atualiza índice
    currentIndex = (currentIndex + 1) % modelos.length;
  };

  const startCarousel = () => {
    if (intervalId) clearInterval(intervalId);
    updateModel();
    intervalId = setInterval(updateModel, 10000);
  };

  // Inicializa carrossel
  startCarousel();

  // Adiciona cliques aos títulos
  document.querySelectorAll('.titulo-item').forEach((titulo, index) => {
    titulo.addEventListener('click', () => {
      currentIndex = index;
      startCarousel();
    });
  });
});