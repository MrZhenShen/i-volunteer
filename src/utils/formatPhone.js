export default function formatPhone(phone) {
  if (phone.length === 10) {
    return `+38 (${phone.slice(0, 3)}) ${phone.slice(3, 6)} ${phone.slice(6, 8)} ${phone.slice(8, 10)}`;
  }

  return phone;
}
