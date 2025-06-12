const matriz = document.getElementById("matriz");
const form = document.getElementById("riskForm");
let riscos = [];

function corPorNivel(p, i) {
  const score = p * i;
  if (score >= 20) return 'red';
  if (score >= 12) return 'orange';
  if (score >= 8) return 'yellow';
  if (score >= 4) return 'green';
  return 'blue';
}

function renderMatriz() {
  matriz.innerHTML = "";
  for (let p = 5; p >= 1; p--) {
    for (let i = 1; i <= 5; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      const risco = riscos.find(r => r.p === p && r.i === i);
      if (risco) {
        const cor = corPorNivel(p, i);
        cell.classList.add(cor);
        cell.innerHTML = `
          <div class="risk-title">${risco.titulo}</div>
          <div class="risk-desc" style="display:none;">${risco.descricao}</div>
        `;
        cell.addEventListener('click', () => {
          const desc = cell.querySelector('.risk-desc');
          desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
        });
      }
      matriz.appendChild(cell);
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const probabilidade = parseInt(document.getElementById("probabilidade").value);
  const impacto = parseInt(document.getElementById("impacto").value);
  riscos.push({ titulo, descricao, p: probabilidade, i: impacto });
  renderMatriz();
  form.reset();
});

renderMatriz();