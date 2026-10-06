const STORAGE_KEY = "clientsList";

export function getClients() {
  // O armazenamento devolve texto. Uma chave sem cadastros devolve null.
  const storedText = localStorage.getItem(STORAGE_KEY);

  if (storedText === null || storedText === "") {
    return [];
  }

  // Se o texto não for JSON válido, JSON.parse lança um erro.
  const clients = JSON.parse(storedText);

  if (!Array.isArray(clients)) {
    throw new Error("Os cadastros salvos não são uma lista válida.");
  }

  // A lista deve conter objetos de clientes, não valores vazios ou outras listas.
  for (const client of clients) {
    if (!client) {
      throw new Error("Os cadastros salvos não são uma lista válida.");
    }

    if (typeof client !== "object") {
      throw new Error("Os cadastros salvos não são uma lista válida.");
    }

    if (Array.isArray(client)) {
      throw new Error("Os cadastros salvos não são uma lista válida.");
    }
  }

  return clients;
}

export function saveClients(clients) {
  if (!Array.isArray(clients)) {
    throw new Error("Informe uma lista de clientes.");
  }

  const clientsText = JSON.stringify(clients);
  localStorage.setItem(STORAGE_KEY, clientsText);
}

export function addClient(client) {
  // Leia a lista atual antes de adicionar, evitando usar uma cópia antiga.
  const clients = getClients();
  clients.push(client);
  saveClients(clients);
}
