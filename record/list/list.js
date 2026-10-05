document.addEventListener("DOMContentLoaded", function () {

  const clientsAll = JSON.parse(localStorage.getItem("clientsList")) || [];

  const clientsActive = clientsAll.filter(client => client.isActive);

  const clientsInactive = clientsAll.filter(client => !client.isActive);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
 
  const clientsThisMonth = clientsAll.filter(client => {
    const date = new Date(client.createdAt);
    return !Number.isNaN(date.getTime()) &&
      date.getFullYear() === currentYear &&
      date.getMonth() + 1 === currentMonth;
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const reportType = urlParams.get('report');
  const reportTitle = document.getElementById('report-title-description');

  let clients = [];


  switch (reportType) {
    case 'all':
      clients = clientsAll;
      reportTitle.textContent = 'de Clientes';
      break;
    case 'active':
      clients = clientsActive;
      reportTitle.textContent = 'de Clientes ativos';
      break;
    case 'inactive':
      clients = clientsInactive;
      reportTitle.textContent = 'de Clientes inativos';
      break;
    case 'this-month':
      clients = clientsThisMonth;
      reportTitle.textContent = 'de cadastros do mês';
      break;
    default:
      alert('Tipo de relatório não especificado ou inválido. Carregando lista completa.');
      clients = clientsAll;
      break;
  }


  const tableBody = document.querySelector("#clients-list tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  if (clients.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>Nenhum cliente encontrado para este filtro.</td></tr>";
    return;
  }

  clients.forEach(client => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = client.name;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = client.email;

    const tdStatus = document.createElement("td");
    tdStatus.textContent = client.isActive ? "Ativo" : "Inativo";
    tdStatus.classList.add("align-right");

    if (!client.isActive) {
      tdStatus.classList.add("status-inactive");
    }

    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdStatus);

    tableBody.appendChild(tr);
  });
}); 