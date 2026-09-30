document.addEventListener("DOMContentLoaded", function() {

  const clients = JSON.parse(localStorage.getItem("clientsList")) || [];

function renderStats() {
  const totalCount = clients.length;
  const pendingCount = clients.filter(client => !client.isActive).length;

  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const lastMonthCount = clients.filter(client => {
    if (!client.createdAt) return false;

    const createdAt = new Date(client.createdAt).getTime();

    return !Number.isNaN(createdAt) &&
      createdAt >= thirtyDaysAgo &&
      createdAt <= now;
  }).length;

  document.querySelector("#total-registrations p").textContent = totalCount;
  document.querySelector("#registrations-peding p").textContent = pendingCount;
  document.querySelector("#registrations-month p").textContent = lastMonthCount;
}

  function renderTable() {
    const tableBody = document.querySelector('#last-registrations tbody');
    tableBody.innerHTML = '';

    if (clients.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>Nenhum cliente cadastrado.</td></tr>";
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
  }


  renderStats();
  renderTable();
});