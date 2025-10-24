// ======== MENU HAMBÚRGUER ========
const hamburguer = document.getElementById("hamburguer");
const menu = document.getElementById("menu");

hamburguer.addEventListener("click", () => {
  menu.classList.toggle("ativo");
  hamburguer.classList.toggle("ativo");
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

const emojis = ["🎉", "✨"];
let confetes = [];

function criarConfetes(qtd, explosao = false, xBase = 0, yBase = 0) {
  for (let i = 0; i < qtd; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = explosao ? Math.random() * 8 + 2 : Math.random() * 2 + 1;

    confetes.push({
      x: explosao ? xBase : Math.random() * canvas.width,
      y: explosao ? yBase : Math.random() * canvas.height,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: Math.random() * 25 + 15,
      speed,
      angle,
      rotation: Math.random() * 360,
      life: explosao ? 100 + Math.random() * 50 : Infinity,
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
    c.y += Math.sin(c.angle) * c.speed;
    c.rotation += 2;

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

  // Efeito de várias pequenas explosões
  setTimeout(() => criarConfetes(4, true, centroX - 20, centroY + 10), 30);
  setTimeout(() => criarConfetes(4, true, centroX + 20, centroY + 10), 30);
  setTimeout(() => criarConfetes(5, true, centroX, centroY - 10), 2);
}

// ======== INICIALIZAÇÃO ========
criarConfetes(8); // confetes caindo normalmente
explosaoCentral(); // explosão inicial 🎇
animarConfete();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
