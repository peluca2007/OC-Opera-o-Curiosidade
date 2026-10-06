import { getClients } from "../../shared/services/client-service.js";
import { renderClientTable, renderTableMessage } from "../../shared/ui/client-table.js";

const tbody = document.querySelector("#clients-registrations tbody");

try {
  const clients = getClients();
  renderClientTable(tbody, clients);
} catch (error) {
  console.error("Erro na listagem:", error);
  renderTableMessage(tbody, "Não foi possível carregar os cadastros.");
}
