//test de prueba para probar github Actions

const sum = require('../index');

test('sums two numbers', () => {
  expect(sum(1, 2)).toBe(3);
});
