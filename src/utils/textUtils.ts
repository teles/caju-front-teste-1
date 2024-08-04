/**
 * Remove todos os caracteres não numéricos de uma string.
 *
 * @param text - A string da qual os caracteres não numéricos devem ser removidos.
 * @returns A string resultante após a remoção dos caracteres não numéricos.
 */
export const removeNonNumeric = (text: string) => text.replace(/\D/g, "");
