export default function rand(str: string) {
  // survey의 id 마지막 글자로 판별해서 boolean 반환
  let result = false;

  const target = str.slice(-1).charCodeAt(0);

  if (target < 58) {
    // target 범위 '0'~'9'
    if (target < 53) result = true;
  } else if (target < 91) {
    // target 범위 'A'~'Z'
    if (target < 78) result = true;
  } else {
    // target 범위 'a'~'z'
    if (target < 110) result = true;
  }

  return result;
}
