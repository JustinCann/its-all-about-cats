/**
 * A utility function to check if a breakpoint is active.
 */
export function toQueryString<T extends Record<string, unknown>>(params: T): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const val of value) {
        searchParams.append(key, String(val));
      }
    } else if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
}

/**
 * A simply pluralising utility.
 *
 * @param word The words to be pluralised if needed.
 * @param quantity optional - Determines if the words should be plural.
 */
export const pluralise = (word: string, quantity = 2): string => {
  if (quantity === 1) return word;

  // Determine the plural form of the word
  if (word.endsWith("y")) {
    return word.substring(0, word.length - 1) + "ies";
  } else if (
    word.endsWith("ch") ||
    word.endsWith("s") ||
    word.endsWith("sh") ||
    word.endsWith("x") ||
    word.endsWith("z")
  ) {
    return word + "es";
  } else {
    return word + "s";
  }
};

/**
 * A utility function to group an array of objects by a key.
 */
export function groupBy<T>(array: T[], key: keyof T): Map<T[keyof T], T[]> {
  const resultMap = new Map<T[keyof T], T[]>();

  array.forEach((item) => {
    const keyValue = item[key];
    if (!resultMap.has(keyValue)) {
      resultMap.set(keyValue, []);
    }
    resultMap.get(keyValue)?.push(item);
  });

  return resultMap;
}
