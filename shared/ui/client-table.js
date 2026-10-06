function createCell(value) {
  const cell = document.createElement("td");

  if (value === null || value === undefined) {
    value = "";
  }

  // O conteúdo do cliente é apresentado como texto, não como HTML.
  cell.textContent = String(value);

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

export function renderClientTable(tbody, clients, emptyMessage = "Nenhum cliente cadastrado.") {
  tbody.replaceChildren();

  if (clients.length === 0) {
    renderTableMessage(tbody, emptyMessage);
    return;
  }

  // Monte as linhas antes de colocá-las na tabela da página.
  const fragment = document.createDocumentFragment();

  for (const client of clients) {
    const row = document.createElement("tr");

    let name = client.name;
    if (!name) {
      name = "Não informado";
    }

    let email = client.email;
    if (!email) {
      email = "Não informado";
    }

    let statusText = "Inativo";
    if (client.isActive) {
      statusText = "Ativo";
    }

    const nameCell = createCell(name);
    const emailCell = createCell(email);
    const statusCell = createCell(statusText);

    statusCell.classList.add("align-right");

    if (!client.isActive) {
      statusCell.classList.add("status-inactive");
    }

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(statusCell);

    fragment.appendChild(row);
  }

  tbody.appendChild(fragment);
}
