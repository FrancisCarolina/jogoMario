const mario = document.querySelector(".mario");
const cano = document.querySelector(".cano");
const nuvem = document.querySelector(".nuvem");
const fimDeJogo = document.querySelector(".fim-de-jogo");
const botaoReiniciar = document.querySelector(".reiniciar");

let pontuacao = 0;

function atualizaPontuacao() {
  console.log("Pontuação: ", pontuacao);
}

let loopJogo = setInterval(verificarColisoes, 10);

function pararJogo() {
  clearInterval(loopJogo);
  console.log("Jogo Parado");
}

function fazerMarioPular() {
  mario.classList.add("pular");
  setTimeout(function () {
    mario.classList.remove("pular");
    pontuacao++;
    atualizaPontuacao();
  }, 500);
}

function verificarColisoes() {
  const posicaoCano = cano.offsetLeft;
  const posicaoMario = parseFloat(getComputedStyle(mario).bottom);
  const posicaoNuvem = parseFloat(getComputedStyle(nuvem).bottom);

  if (posicaoCano <= 100 && posicaoCano > 0 && posicaoMario < 60) {
    console.log("Você morreu, sua pontuação foi de: ", pontuacao);
    pontuacao = 0;
    pararJogo();

    cano.style.animation = "none";
    cano.style.left = `${posicaoCano}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${posicaoMario}px`;
    mario.src = "assets/imgs/fim-de-jogo.png";
    mario.style.width = "70px";
    mario.style.marginLeft = "35px";

    nuvem.style.animation = "nuvem 20s infinite linear";
    nuvem.style.left = `${posicaoNuvem}px`;

    fimDeJogo.style.visibility = "visible";
  }
}

// ...

function reiniciarJogo() {
  pontuacao = 0;
  atualizaPontuacao();

  cano.style.animation = "animacoes-cano 1.5s infinite linear";
  mario.style.animation = "none";
  nuvem.style.animation = "nuvem 20s infinite linear";

  mario.src = "./assets/imgs/mario.gif";
  mario.style.width = "130px";
  mario.style.marginLeft = "0";
  mario.style.bottom = "0px";

  cano.style.left = "100%";

  nuvem.style.left = "0";

  fimDeJogo.style.visibility = "hidden";

  loopJogo = setInterval(verificarColisoes, 10);
}

document.addEventListener("keyup", fazerMarioPular);
document.addEventListener("click", reiniciarJogo);
