import { getClients } from "../../shared/services/client-service.js";
import { seedClients } from "../../dev/seed-clients.js";
import { isRegisteredThisMonth } from "../../shared/utils/client-filters.js";
import { renderClientTable, renderTableMessage } from "../../shared/ui/client-table.js";

const tbody = document.querySelector("#last-registrations tbody");

try {
  let clients = getClients();

  // Preenche o protótipo com exemplos somente quando não há clientes.
  if (clients.length === 0) {
    seedClients();
    clients = getClients();
  }

  document.querySelector("#total-registrations p").textContent = clients.length;
  document.querySelector("#registrations-pending p").textContent =
    clients.filter(client => !client.isActive).length;
  document.querySelector("#registrations-month p").textContent =
    clients.filter(client => isRegisteredThisMonth(client)).length;

  renderClientTable(tbody, clients);
} catch (error) {
  console.error("Erro no dashboard:", error);
  ["total-registrations", "registrations-pending", "registrations-month"]
    .forEach(id => document.querySelector("#" + id + " p").textContent = "—");
  renderTableMessage(tbody, "Não foi possível carregar os cadastros.");
}

