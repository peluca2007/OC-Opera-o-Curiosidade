import { getClients } from "../services/client-service.js";
import { filterClients } from "../utils/client-filters.js";
import { renderClientTable, renderTableMessage } from "./client-table.js";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const dialog = document.getElementById("search-dialog");
const closeButton = document.getElementById("close-dialog");
const status = document.getElementById("search-status");
const summary = document.getElementById("search-summary");
const tbody = document.querySelector("#search-results tbody");

function showResults() {
  const term = input.value.trim();
  if (!term) {
    summary.textContent = "Informe o que deseja pesquisar.";
    renderTableMessage(tbody, "Digite um nome, e-mail ou telefone.");
  } else {
    try {

      const results = filterClients(getClients(), term, status.value);
      summary.textContent = results.length === 1
        ? "1 cliente encontrado."
        : results.length + " clientes encontrados.";
      renderClientTable(tbody, results, "Nenhum cliente encontrado.");
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      summary.textContent = "Não foi possível carregar os cadastros.";
      renderTableMessage(tbody, "Verifique os dados salvos e tente novamente.");
    }
  }

  if (!dialog.open) dialog.showModal();
}


// Enter envia o formulário e executa a pesquisa sem recarregar a página.
if (form && input && dialog && closeButton && status && summary && tbody) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    showResults();
  });
  status.addEventListener("change", showResults);
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => input.focus());
}
