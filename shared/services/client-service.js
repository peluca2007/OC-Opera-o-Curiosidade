const STORAGE_KEY = "clientsList";

// A chave original é mantida para reaproveitar os cadastros já salvos.
// Dados inválidos geram erro: não devem ser tratados como uma lista vazia.
export function getClients() {
  const clients = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (!Array.isArray(clients) || clients.some(client =>
    !client || typeof client !== "object" || Array.isArray(client)
  )) {
    throw new Error("Os cadastros salvos não são uma lista válida.");
  }
  return clients;
}

export function saveClients(clients) {
  if (!Array.isArray(clients)) {
    throw new Error("Informe uma lista de clientes.");
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

export function addClient(client) {
  // Leia no momento de salvar para não usar uma lista antiga.
  const clients = getClients();
  clients.push(client);
  saveClients(clients);
}

