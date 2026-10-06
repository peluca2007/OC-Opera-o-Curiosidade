import { getClients } from "../../shared/services/client-service.js";
import { getClientCounts } from "../../shared/utils/client-filters.js";
import { renderClientTable, renderTableMessage } from "../../shared/ui/client-table.js";

const totalElement = document.querySelector("#total-registrations p");
const pendingElement = document.querySelector("#registrations-pending p");
const monthElement = document.querySelector("#registrations-month p");
const tbody = document.querySelector("#last-registrations tbody");

try {
  const clients = getClients();
  const counts = getClientCounts(clients);

  totalElement.textContent = counts.total;
  pendingElement.textContent = counts.inactive;
  monthElement.textContent = counts.thisMonth;

  renderClientTable(tbody, clients);
} catch (error) {
  console.error("Erro no dashboard:", error);

  totalElement.textContent = "—";
  pendingElement.textContent = "—";
  monthElement.textContent = "—";

  renderTableMessage(tbody, "Não foi possível carregar os cadastros.");
}
