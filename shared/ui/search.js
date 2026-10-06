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

  if (term === "") {
    summary.textContent = "Informe o que deseja pesquisar.";
    renderTableMessage(tbody, "Digite um nome, e-mail ou telefone.");
  } else {
    try {
      const clients = getClients();
      const selectedStatus = status.value;
      const results = filterClients(clients, term, selectedStatus);
      const resultCount = results.length;

      if (resultCount === 1) {
        summary.textContent = "1 cliente encontrado.";
      } else {
        summary.textContent = resultCount + " clientes encontrados.";
      }

      renderClientTable(tbody, results, "Nenhum cliente encontrado.");
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      summary.textContent = "Não foi possível carregar os cadastros.";
      renderTableMessage(tbody, "Verifique os dados salvos e tente novamente.");
    }
  }

  if (!dialog.open) {
    dialog.showModal();
  }
}

function submitSearch(event) {
  event.preventDefault();
  showResults();
}

function closeSearchDialog() {
  dialog.close();
}

function focusSearchInput() {
  input.focus();
}

function initializeSearch() {
  // Só registre eventos se a página tiver todos os elementos da pesquisa.
  if (!form || !input || !dialog || !closeButton || !status || !summary || !tbody) {
    return;
  }

  // As funções abaixo são executadas quando seus eventos acontecem.
  form.addEventListener("submit", submitSearch);
  status.addEventListener("change", showResults);
  closeButton.addEventListener("click", closeSearchDialog);
  dialog.addEventListener("close", focusSearchInput);
}

initializeSearch();
