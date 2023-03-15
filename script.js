const salarioBruto = document.getElementById('bruto');
const descontos = document.getElementById('descontos');
const calcularBtn = document.getElementById('calcular');
const clearBtn = document.getElementById('clear');
const inssValor = document.getElementById('inss-valor');
const inssTaxa = document.getElementById('inss-taxa');
const irrfValor = document.getElementById('irrf-valor');
const irrfTaxa = document.getElementById('irrf-taxa');
const valorDesconto = document.getElementById('valor-desconto');
const valorBruto = document.getElementById('valor-bruto');
const totalProventos = document.getElementById('total-proventos');
const totalDescontos = document.getElementById('total-descontos');
const valorLiquido = document.getElementById('valor-liquido');

const deduzInss = () => {
  let taxa = 0;
  const salario = salarioBruto.value;
  if (salario > 0 && salario <= 1302) {
    taxa = salario * 0.075;
  }
  if (salario > 1302 && salario <= 2571.29) {
    taxa = 1302 * 0.075 + (salario - 1302) * 0.09;
  }
  if (salario > 2571.29 && salario <= 3856.94) {
    taxa = 1302 * 0.075 + (2571.29 - 1302) * 0.09 + (salario - 2571.29) * 0.12;
  }
  if (salario > 3856.95 && salario <= 7507.49) {
    taxa = 1302 * 0.075 + (2571.29 - 1302) * 0.09 + (3856.95 - 2571.29) * 0.12 + (salario - 3856.95) * 0.14;
  }
  if (salario > 7507.49) {
    taxa = 1302 * 0.075 + (2571.30 - 1302) * 0.09 + (3856.94 - 2571.30) * 0.12 + (7507.49 - 3856.94) * 0.14;
  }
  inssValor.innerHTML = `R$ ${taxa.toFixed(2)}`;
  inssTaxa.innerHTML = `${(taxa * 100 / salario).toFixed(2)} %`;
  return taxa.toFixed(2)
}

const deduzIrrf = () => {
  const salarioBase = salarioBruto.value - deduzInss();
  let taxa = 0;
  if (salarioBase <= 1903.98) {
    taxa = 0;
  }
  if (salarioBase > 1903.98 && salarioBase <= 2826.65) {
    taxa = 0.075 * salarioBase - 142.8;
  }
  if (salarioBase > 2826.65 && salarioBase <= 3751.05) {
    taxa = 0.15 * salarioBase - 354.8;
  }
  if (salarioBase > 3751.05 && salarioBase <= 4664.68) {
    taxa = 0.225 * salarioBase - 636.13;
  }
  if (salarioBase > 4664.68) {
    taxa = 0.275 * salarioBase - 869.36;
  }
  irrfValor.innerHTML = `R$ ${taxa.toFixed(2)}`;
  irrfTaxa.innerHTML = `${(taxa * 100 / salarioBase).toFixed(2)} %`;
  return taxa.toFixed(2)
};

const insereDescontos = () => {
  if (descontos.value) {
    valorDesconto.innerHTML = `R$ ${descontos.value}`;
  } else {
    valorDesconto.innerHTML = 'R$ 0,00';
  }
}

const insereSalarioBruto = () => {
  if (salarioBruto.value) {
    valorBruto.innerHTML = `R$ ${salarioBruto.value}`;
  }
}

const insereTotais = () => {
  if (salarioBruto.value) {
    totalProventos.innerHTML = `R$ ${salarioBruto.value}`;
  }
  const valorTotalDescontos = Number(descontos.value) + Number(deduzInss()) + Number(deduzIrrf());
  totalDescontos.innerHTML = `R$ ${valorTotalDescontos.toFixed(2)}`
  valorLiquido.innerHTML = `R$ ${(salarioBruto.value - valorTotalDescontos).toFixed(2)}`
}

calcularBtn.addEventListener('click', deduzInss);
calcularBtn.addEventListener('click', deduzIrrf);
calcularBtn.addEventListener('click', insereDescontos);
calcularBtn.addEventListener('click', insereSalarioBruto);
calcularBtn.addEventListener('click', insereTotais);
clearBtn.addEventListener('click', () => {
  valorBruto.innerHTML = `R$ 0.00`;
  inssValor.innerHTML = `R$ 0.00`;
  inssTaxa.innerHTML = `0.00 %`;
  irrfValor.innerHTML = `R$ 0.00`;
  irrfTaxa.innerHTML = `0.00 %`;
  totalProventos.innerHTML = `R$ 0.00`;
  totalDescontos.innerHTML = `R$ 0.00`;
  valorLiquido.innerHTML = `R$ 0.00`;
  valorDesconto.innerHTML = 'R$ 0.00';
})