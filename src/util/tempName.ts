export default function tempName(key: string) {
  let name = '익명';
  const randomNumber = Math.floor(Math.random() * 100);
  const sample = String(randomNumber < 10 ? '0' + randomNumber : randomNumber);
  if (key.length < 2) {
    name += randomChar() + randomChar() + sample;
  } else {
    name += key.slice(-2) + sample;
  }

  return name;
}

function randomChar(): string {
  let char: string;
  if (Math.random() >= 0.5) {
    const upper = Math.floor(Math.random() * 25 + 65);
    char = String.fromCharCode(upper);
  } else {
    const lower = Math.floor(Math.random() * 25 + 97);
    char = String.fromCharCode(lower);
  }
  return char;
}
