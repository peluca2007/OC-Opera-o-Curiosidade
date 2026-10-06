import { getClients } from "../../shared/services/client-service.js";
import { isRegisteredThisMonth } from "../../shared/utils/client-filters.js";
import { renderClientTable, renderTableMessage } from "../../shared/ui/client-table.js";

const tbody = document.querySelector("#clients-list tbody");
const title = document.getElementById("report-title-description");
const reportType = new URLSearchParams(window.location.search).get("report");

const reports = {
  all: { title: "de Clientes", filter: () => true },
  active: { title: "de Clientes ativos", filter: client => client.isActive },
  inactive: { title: "de Clientes inativos", filter: client => !client.isActive },
  "this-month": { title: "de cadastros do mês", filter: client => isRegisteredThisMonth(client) }
};

const report = reports[reportType];
if (!report) {
  title.textContent = "— relatório inválido";
  renderTableMessage(tbody, "Escolha um relatório na página de Relatórios.");
} else {
  title.textContent = report.title;
  try {
    const clients = getClients().filter(report.filter);
    renderClientTable(tbody, clients, "Nenhum cliente encontrado para este filtro.");
  } catch (error) {
    console.error("Erro na lista do relatório:", error);
    renderTableMessage(tbody, "Não foi possível carregar os cadastros.");
  }
}

document.getElementById("print-report").addEventListener("click", () => window.print());

