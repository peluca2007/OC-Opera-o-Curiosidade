function createCell(value) {
  const cell = document.createElement("td");
  // Dados digitados pelo usuário são texto, não HTML.
  cell.textContent = String(value ?? "");
  return cell;
}

export function renderTableMessage(tbody, message) {
  const row = document.createElement("tr");
  const cell = createCell(message);
  cell.colSpan = 3;
  cell.classList.add("table-message");
  row.appendChild(cell);
  tbody.replaceChildren(row);
}

// A página informa qual tabela será preenchida; o módulo não escolhe uma tela.
export function renderClientTable(tbody, clients, emptyMessage = "Nenhum cliente cadastrado.") {
  tbody.replaceChildren();
  if (!clients.length) {
    renderTableMessage(tbody, emptyMessage);
    return;
  }

  const fragment = document.createDocumentFragment();
  clients.forEach(client => {
    const row = document.createElement("tr");
    row.appendChild(createCell(client.name || "Não informado"));
    row.appendChild(createCell(client.email || "Não informado"));
    const status = createCell(client.isActive ? "Ativo" : "Inativo");
    status.classList.add("align-right");
    if (!client.isActive) status.classList.add("status-inactive");
    row.appendChild(status);
    fragment.appendChild(row);
  });
  tbody.appendChild(fragment);
}

