const number = 34315;

const findLowestSum = (number) => {
  const digits = Array.from(String(number), Number);
  let lowestSum = 0;

  digits.forEach((digit, i) => {
    const leftSum = digits.slice(0, i).reduce((sum, num) => sum + num, 0);
    const rightSum = digits.slice(i + 1).reduce((sum, num) => sum + num, 0);
    const sum = leftSum + rightSum;

    if (i === 0 || sum < lowestSum) {
      lowestSum = sum;
    }
  });

  return lowestSum;
};

console.log(findLowestSum(number));
