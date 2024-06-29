export function formatAddress(address) {
  const parts = [];
  const partNames = ["zipCode", "state", "city", "street", "buildingNumber", "apartmentNumber"];

  for (const part of partNames) {
    if (address[part]) {
      parts.push(address[part]);
    }
  }

  return parts.join(", ");
}
