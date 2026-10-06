export function normalizeText(value) {
  // Campos ausentes são comparados como texto vazio.
  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);

  // NFD separa as letras de suas marcas de acentuação.
  const decomposedText = text.normalize("NFD");

  // A expressão regular remove todas essas marcas.
  const textWithoutAccents = decomposedText.replace(/[\u0300-\u036f]/g, "");
  const lowercaseText = textWithoutAccents.toLowerCase();
  const trimmedText = lowercaseText.trim();

  return trimmedText;
}
