// ======== MENU HAMBÚRGUER ========
const hamburguer = document.getElementById("hamburguer");
const menu = document.getElementById("menu");

hamburguer.addEventListener("click", () => {
  menu.classList.toggle("ativo");
  hamburguer.classList.toggle("ativo");
  
  // Adiciona efeito de confete ao abrir o menu
  if (menu.classList.contains("ativo")) {
    criarExplosaoMenu();
  }
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !hamburguer.contains(e.target)) {
    menu.classList.remove("ativo");
    hamburguer.classList.remove("ativo");
  }
});

// ======== CONFETE E EMOJIS DE FELICIDADE ========
const canvas = document.getElementById("confete");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const emojis = ["🎉", "✨", "🎊", "🌟"];
let confetes = [];

function criarConfetes(qtd, explosao = false, xBase = 0, yBase = 0) {
  for (let i = 0; i < qtd; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = explosao ? Math.random() * 8 + 2 : Math.random() * 2 + 1;

    confetes.push({
      x: explosao ? xBase : Math.random() * canvas.width,
      y: explosao ? yBase : Math.random() * canvas.height,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: Math.random() * 20 + 15,
      speed,
      angle,
      rotation: Math.random() * 360,
      life: explosao ? 80 + Math.random() * 40 : Infinity,
      gravity: explosao ? 0.08 : 0.03,
      bounce: explosao ? 0.6 : 0.2,
    });
  }
}

function animarConfete() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetes.forEach((c, i) => {
    ctx.save();
    ctx.font = `${c.size}px serif`;
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotation * Math.PI) / 180);
    ctx.fillText(c.emoji, 0, 0);
    ctx.restore();

    c.x += Math.cos(c.angle) * c.speed;
    c.y += Math.sin(c.angle) * c.speed + c.gravity;
    c.rotation += 2;
    c.speed *= 0.98;

    if (c.life !== Infinity) c.life--;

    if (c.y > canvas.height + 50 || c.x < -50 || c.x > canvas.width + 50 || c.life <= 0) {
      confetes.splice(i, 1);
    }
  });

  requestAnimationFrame(animarConfete);
}

// ======== EXPLOSÃO INICIAL ========
function explosaoCentral() {
  const centroX = canvas.width / 2;
  const centroY = canvas.height / 2;
  criarConfetes(5, true, centroX, centroY);

  // Efeito de pequenas explosões
  setTimeout(() => criarConfetes(3, true, centroX - 30, centroY + 15), 100);
  setTimeout(() => criarConfetes(3, true, centroX + 30, centroY + 15), 100);
}

// ======== EXPLOSÃO DO MENU ========
function criarExplosaoMenu() {
  const menuX = 150; // Posição do menu
  const menuY = canvas.height / 2;
  criarConfetes(4, true, menuX, menuY);
}

// ======== CARROSSEL SIMPLES ========
let slideAtual = 0;
let intervaloCarrossel;

function inicializarCarrossel() {
  console.log('Iniciando carrossel...');
  
  const slides = document.querySelectorAll('.slide');
  const indicadores = document.querySelectorAll('.indicador');
  
  console.log('Slides encontrados:', slides.length);
  console.log('Indicadores encontrados:', indicadores.length);
  
  if (slides.length === 0) {
    console.error('Nenhum slide encontrado!');
    return;
  }
  
  // Função para mostrar slide específico
  function mostrarSlide(index) {
    console.log('Mostrando slide:', index);
    
    // Remove classe ativo de todos os slides
    slides.forEach((slide, i) => {
      slide.classList.remove('ativo');
      console.log(`Slide ${i} removido`);
    });
    
    indicadores.forEach((indicador, i) => {
      indicador.classList.remove('ativo');
    });
    
    // Adiciona classe ativo ao slide e indicador atual
    if (slides[index]) {
      slides[index].classList.add('ativo');
      console.log(`Slide ${index} ativado`);
    }
    if (indicadores[index]) {
      indicadores[index].classList.add('ativo');
    }
    
    slideAtual = index;
  }
  
  // Função para próximo slide
  function proximoSlide() {
    const proximo = (slideAtual + 1) % slides.length;
    mostrarSlide(proximo);
  }
  
  // Event listeners para indicadores
  indicadores.forEach((indicador, index) => {
    indicador.addEventListener('click', () => {
      mostrarSlide(index);
      clearInterval(intervaloCarrossel);
      intervaloCarrossel = setInterval(proximoSlide, 3000);
    });
  });
  
  // Event listeners para slides (clique para confete)
  slides.forEach((slide) => {
    slide.addEventListener('click', () => {
      const rect = slide.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      criarConfetes(10, true, x, y);
    });
  });
  
  // Mostra o primeiro slide imediatamente
  mostrarSlide(0);
  
  // Inicia o carrossel automático após 1 segundo
  setTimeout(() => {
    intervaloCarrossel = setInterval(proximoSlide, 3000);
    console.log('Carrossel automático iniciado');
  }, 1000);
}

// ======== INICIALIZAÇÃO ========
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado, inicializando carrossel...');
  inicializarCarrossel();
});

// ======== INICIALIZAÇÃO ========
criarConfetes(8); // confetes caindo normalmente
setTimeout(() => explosaoCentral(), 500); // explosão inicial 🎇
animarConfete();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ======== EFEITO DE DIGITAÇÃO NO TÍTULO ========
document.addEventListener('DOMContentLoaded', () => {
  const titulo = document.querySelector('.titulo');
  const textoOriginal = titulo.innerHTML;
  
  titulo.innerHTML = '';
  titulo.style.opacity = '0';
  
  setTimeout(() => {
    titulo.style.opacity = '1';
    titulo.innerHTML = textoOriginal;
  }, 1000);
});

// ======== MÚSICA DE FUNDO AUTOMÁTICA ========
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundMusic');
  
  if (audio) {
    // Configurações iniciais
    audio.volume = 0.3; // Volume baixo para música de fundo
    
    // Tenta reproduzir automaticamente
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log('Música de fundo iniciada automaticamente');
      }).catch(error => {
        console.log('Erro na reprodução automática:', error);
        // Se falhar, tenta novamente após interação do usuário
        document.addEventListener('click', () => {
          audio.play().catch(e => console.log('Erro ao reproduzir:', e));
        }, { once: true });
      });
    }
  }
});