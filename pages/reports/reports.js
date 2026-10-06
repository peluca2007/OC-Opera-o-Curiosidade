import { getClients } from "../../shared/services/client-service.js";
import { getClientCounts } from "../../shared/utils/client-filters.js";

const totalElement = document.getElementById("count-all");
const activeElement = document.getElementById("count-active");
const inactiveElement = document.getElementById("count-inactive");
const monthElement = document.getElementById("count-this-month");

try {
  const clients = getClients();
  const counts = getClientCounts(clients);

  totalElement.textContent = counts.total;
  activeElement.textContent = counts.active;
  inactiveElement.textContent = counts.inactive;
  monthElement.textContent = counts.thisMonth;
} catch (error) {
  console.error("Erro nos relatórios:", error);

  totalElement.textContent = "—";
  activeElement.textContent = "—";
  inactiveElement.textContent = "—";
  monthElement.textContent = "—";

  const note = document.getElementById("report-note");
  note.textContent = "Não foi possível ler os cadastros salvos neste navegador.";
  note.hidden = false;
}
