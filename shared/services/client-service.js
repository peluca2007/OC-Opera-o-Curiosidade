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
  // Clientes antigos também recebem uma identificação fixa.
  let addedIds = false;
  clients.forEach(client => {
    if (!client.id) {
      client.id = crypto.randomUUID();
      addedIds = true;
    }
  });
  if (addedIds) saveClients(clients);
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
  client.id = crypto.randomUUID();
  clients.push(client);
  saveClients(clients);
}

export function updateClient(clientId, updatedData) {
  const clients = getClients();
  const client = clients.find(client => client.id === clientId);
  if (!client) throw new Error("Cliente não encontrado.");

  // Mantém a identificação e a data original do cadastro.
  const originalId = client.id;
  const originalDate = client.createdAt;
  Object.assign(client, updatedData);
  client.id = originalId;
  client.createdAt = originalDate;
  saveClients(clients);
}

export function deleteClient(clientId) {
  const clients = getClients();
  const clientIndex = clients.findIndex(client => client.id === clientId);
  if (clientIndex === -1) throw new Error("Cliente não encontrado.");

  clients.splice(clientIndex, 1);
  saveClients(clients);
}

