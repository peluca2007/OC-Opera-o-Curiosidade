import { getClients, deleteClient } from "../../shared/services/client-service.js";
import { renderClientTable, renderTableMessage } from "../../shared/ui/client-table.js";

const tbody = document.querySelector("#clients-registrations tbody");
const dialog = document.getElementById("client-actions");
const clientName = document.getElementById("selected-client-name");
const actionMessage = document.getElementById("client-action-message");
let clients = [];
let selectedClient = null;

function loadClientTable() {
  try {
    clients = getClients();
    renderClientTable(tbody, clients);

    if (clients.length > 0) {
      const rows = Array.from(tbody.rows);
      rows.forEach((row, index) => {
        row.dataset.clientIndex = index;
        row.tabIndex = 0;
        row.setAttribute("aria-haspopup", "dialog");
      });
    }
  } catch (error) {
    console.error("Erro na listagem:", error);
    renderTableMessage(tbody, "Não foi possível carregar os clientes.");
  }
}

function openClientActions(row) {
  const clientIndex = Number(row.dataset.clientIndex);
  selectedClient = clients[clientIndex];
  clientName.textContent = selectedClient.name || "Não informado";
  actionMessage.textContent = "";
  dialog.showModal();
}

tbody.addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-client-index]");
  if (row) openClientActions(row);
});

tbody.addEventListener("keydown", (event) => {
  const row = event.target.closest("tr[data-client-index]");
  const pressedOpenKey = event.key === "Enter" || event.key === " ";
  if (row && pressedOpenKey) {
    event.preventDefault();
    openClientActions(row);
  }
});

document.getElementById("edit-client").addEventListener("click", () => {
  if (!selectedClient) return;
  window.location.href = "client-form.html?id=" + encodeURIComponent(selectedClient.id);
});

document.getElementById("delete-client").addEventListener("click", () => {
  if (!selectedClient) return;
  const confirmed = window.confirm("Excluir o cliente " + selectedClient.name + "?");
  if (!confirmed) return;

  try {
    deleteClient(selectedClient.id);
    dialog.close();
    loadClientTable();
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    actionMessage.textContent = "Não foi possível excluir o cliente.";
  }
});

document.getElementById("close-client-actions").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("close", () => {
  selectedClient = null;
});

loadClientTable();

