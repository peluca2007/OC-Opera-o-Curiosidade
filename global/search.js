const searchInput = document.getElementById("search-input");
const searchDialog = document.getElementById("search-dialog");
const closeButton = document.getElementById("close-dialog");
const tbody = document.querySelector("#search-results tbody");

const clients = JSON.parse(localStorage.getItem("clientsList")) || [];

function showResults() {
  const term = searchInput.value.trim().toLowerCase();

  const results = clients.filter(client =>
    Object.values(client).some(value =>
      String(value ?? "").toLowerCase().includes(term)
    )
  );

  tbody.innerHTML = "";

  results.forEach(client => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${client.name ?? ""}</td>
      <td>${client.email ?? ""}</td>
      <td>${client.isActive ? "Ativo" : "Inativo"}</td>
    `;

    tbody.appendChild(row);
  });

  if (!searchDialog.open) {
    searchDialog.showModal();
  }
}

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    showResults();
  }
});

closeButton.addEventListener("click", () => {
  searchDialog.close();
});