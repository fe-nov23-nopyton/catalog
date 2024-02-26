export function replacePart(str: string, replacement: string, isLast = true) {
  const parts = str.split("-");
  const indexToReplace = isLast ? parts.length - 1 : parts.length - 2;
  parts[indexToReplace] = replacement;
  return parts.join("-");
}
