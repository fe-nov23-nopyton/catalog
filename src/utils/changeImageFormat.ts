export function changeImageFormat(format: string): string {
  const parts = format.split(".");

  const result = parts[0] + ".webp";

  return result;
}
