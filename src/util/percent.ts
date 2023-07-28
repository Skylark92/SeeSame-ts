export default function percent(target: number, total: number) {
  if (isNaN(target) || isNaN(total))
    throw new Error('숫자가 아닌 값이 들어있습니다.');
  else if (total === 0) return 0;
  else return Number(((target / total) * 100).toFixed(0));
}
