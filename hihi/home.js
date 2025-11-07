const botoes = document.querySelectorAll('.botao');
const personagens = document.querySelectorAll('.personagem');

botoes.forEach((botao, index) => {
  botao.addEventListener("click", () => {
    document.querySelector(".botao.selecionado").classList.remove("selecionado");
    botao.classList.add("selecionado");

    document.querySelector(".personagem.selecionado").classList.remove("selecionado");
    personagens[index].classList.add("selecionado");
  });
});
