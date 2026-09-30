document.addEventListener("DOMContentLoaded", function () {

  const tableBody = document.querySelector("#clients-list tbody");

  const clients = JSON.parse(localStorage.getItem("clientsList")) || [];


  tableBody.innerHTML = "";

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
});