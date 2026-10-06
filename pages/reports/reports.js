import { getClients } from "../../shared/services/client-service.js";
import { isRegisteredThisMonth } from "../../shared/utils/client-filters.js";

try {
  const clients = getClients();
  document.getElementById("count-all").textContent = clients.length;
  document.getElementById("count-active").textContent =
    clients.filter(client => client.isActive).length;
  document.getElementById("count-inactive").textContent =
    clients.filter(client => !client.isActive).length;
  document.getElementById("count-this-month").textContent =
    clients.filter(client => isRegisteredThisMonth(client)).length;
} catch (error) {
  console.error("Erro nos relatórios:", error);
  ["count-all", "count-active", "count-inactive", "count-this-month"]
    .forEach(id => document.getElementById(id).textContent = "—");
  const note = document.getElementById("report-note");
  note.textContent = "Não foi possível ler os cadastros salvos neste navegador.";
  note.hidden = false;
}

