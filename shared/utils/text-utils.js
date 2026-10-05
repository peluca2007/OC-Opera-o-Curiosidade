// "José" e "JOSE" passam a ter o mesmo texto de comparação: "jose".
export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

