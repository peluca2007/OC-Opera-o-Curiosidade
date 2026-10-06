import { getClients } from "../../shared/services/client-service.js";
import { getClientsByStatus, isRegisteredThisMonth } from "../../shared/utils/client-filters.js";
import { renderClientTable, renderTableMessage } from "../../shared/ui/client-table.js";

const tbody = document.querySelector("#clients-list tbody");
const title = document.getElementById("report-title-description");

// Leia a opção enviada pelo link, por exemplo: ?report=active.
const urlParams = new URLSearchParams(window.location.search);
const reportType = urlParams.get("report");

function loadReport() {
  let reportTitle = "";

  // Cada opção da URL corresponde a um título e um filtro.
  switch (reportType) {
    case "all":
      reportTitle = "de Clientes";
      break;
    case "active":
      reportTitle = "de Clientes ativos";
      break;
    case "inactive":
      reportTitle = "de Clientes inativos";
      break;
    case "this-month":
      reportTitle = "de cadastros do mês";
      break;
    default:
      title.textContent = "— relatório inválido";
      renderTableMessage(tbody, "Escolha um relatório na página de Relatórios.");
      return;
  }

  title.textContent = reportTitle;

  try {
    const clients = getClients();
    let reportClients = [];

    if (reportType === "this-month") {
      for (const client of clients) {
        if (isRegisteredThisMonth(client)) {
          reportClients.push(client);
        }
      }
    } else {
      reportClients = getClientsByStatus(clients, reportType);
    }

    renderClientTable(tbody, reportClients, "Nenhum cliente encontrado para este filtro.");
  } catch (error) {
    console.error("Erro na lista do relatório:", error);
    renderTableMessage(tbody, "Não foi possível carregar os cadastros.");
  }
}

function printReport() {
  window.print();
}

loadReport();

const printButton = document.getElementById("print-report");
printButton.addEventListener("click", printReport);
