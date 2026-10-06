import { normalizeText } from "./text-utils.js";

export function isRegisteredThisMonth(client, today = new Date()) {
  if (!client.createdAt) {
    return false;
  }

  const date = new Date(client.createdAt);
  const dateTime = date.getTime();

  if (Number.isNaN(dateTime)) {
    return false;
  }

  if (date.getFullYear() !== today.getFullYear()) {
    return false;
  }

  if (date.getMonth() !== today.getMonth()) {
    return false;
  }

  if (dateTime > today.getTime()) {
    return false;
  }

  return true;
}

// Reutilizada pelos relatórios para selecionar ativos ou inativos.
export function getClientsByStatus(clients, status) {
  if (status === "all") {
    return clients;
  }

  const results = [];

  for (const client of clients) {
    if (status === "active" && client.isActive) {
      results.push(client);
    }

    if (status === "inactive" && !client.isActive) {
      results.push(client);
    }
  }

  return results;
}

// Dashboard e relatórios usam a mesma regra de contagem.
export function getClientCounts(clients) {
  let activeCount = 0;
  let inactiveCount = 0;
  let thisMonthCount = 0;

  for (const client of clients) {
    if (client.isActive) {
      activeCount = activeCount + 1;
    } else {
      inactiveCount = inactiveCount + 1;
    }

    if (isRegisteredThisMonth(client)) {
      thisMonthCount = thisMonthCount + 1;
    }
  }

  return {
    total: clients.length,
    active: activeCount,
    inactive: inactiveCount,
    thisMonth: thisMonthCount
  };
}

export function filterClients(clients, term, status = "all") {
  const searchText = normalizeText(term);

  if (searchText === "") {
    return [];
  }

  // Aceita os caracteres normalmente usados ao escrever um telefone.
  const phonePattern = /^[\d\s()+.-]+$/;
  let phoneTerm = "";

  if (phonePattern.test(searchText)) {
    phoneTerm = searchText.replace(/\D/g, "");
  }

  const clientsWithSelectedStatus = getClientsByStatus(clients, status);
  const results = [];

  for (const client of clientsWithSelectedStatus) {
    const name = normalizeText(client.name);
    const email = normalizeText(client.email);
    const phone = normalizeText(client.phone);

    const matchesName = name.includes(searchText);
    const matchesEmail = email.includes(searchText);
    const matchesPhoneText = phone.includes(searchText);

    let matchesPhoneDigits = false;

    if (phoneTerm !== "") {
      const phoneDigits = phone.replace(/\D/g, "");
      matchesPhoneDigits = phoneDigits.includes(phoneTerm);
    }

    if (matchesName || matchesEmail || matchesPhoneText || matchesPhoneDigits) {
      results.push(client);
    }
  }

  return results;
}
