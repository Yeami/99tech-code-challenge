const sumToN_1 = (n) => {
  if (n === 1) return 1;

  return n + sumToN_1(n - 1);
};

const sumToN_2 = (n) => {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
      sum += i;
  }

  return sum;
};

const sumToN_3 = (n) => {
  return (n * (n + 1)) / 2;
};

const sumToN_4 = (n) => {
  return Array
    .from({ length: n }, (_, i) => i + 1)
    .reduce((total, current) => total + current, 0);
};

const numberToSum = 5;

console.log('sumToN_1: ', sumToN_1(numberToSum));
console.log('sumToN_2: ', sumToN_2(numberToSum));
console.log('sumToN_3: ', sumToN_3(numberToSum));
console.log('sumToN_4: ', sumToN_4(numberToSum));
