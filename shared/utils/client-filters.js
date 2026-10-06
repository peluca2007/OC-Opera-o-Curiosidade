import { normalizeText } from "./text-utils.js";

export function isRegisteredThisMonth(client, today = new Date()) {
  if (!client.createdAt) return false;
  const date = new Date(client.createdAt);
  return !Number.isNaN(date.getTime()) &&
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getTime() <= today.getTime();
}

// Função sem acesso ao HTML ou ao armazenamento: recebe dados e devolve resultados.
export function filterClients(clients, term, status = "all") {
  const text = normalizeText(term);
  if (!text) return [];

  const phoneTerm = /^[\d\s()+.-]+$/.test(text) ? text.replace(/\D/g, "") : "";

  return clients.filter(client => {
    const matchesStatus = status === "all" ||
      (status === "active" && client.isActive) ||
      (status === "inactive" && !client.isActive);
    const matchesText = [client.name, client.email, client.phone]
      .some(value => normalizeText(value).includes(text));
    const matchesPhone = phoneTerm &&
      String(client.phone ?? "").replace(/\D/g, "").includes(phoneTerm);
    return matchesStatus && (matchesText || matchesPhone);
  });
}

