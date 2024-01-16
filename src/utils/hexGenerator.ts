function generateRandomHexColorCode(name: string): string {
  // Use the name to generate a hash code
  let hashCode = 0;
  for (let i = 0; i < name.length; i++) {
    hashCode = name.charCodeAt(i) + ((hashCode << 5) - hashCode);
  }

  // Convert the hash code to a 6-digit hexadecimal color code
  const color = `#${(hashCode & 0x00ffffff).toString(16).toUpperCase().padStart(6, "0")}`;

  return color;
}

export { generateRandomHexColorCode };
