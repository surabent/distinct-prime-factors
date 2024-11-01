const {
  generatePrimes,
  getPrimeDistinctFactors,
  findConsecutiveNumbers,
  solve,
} = require("./prime");

describe("generatePrimes function", () => {
  test("Generate prime factors", () => {
    const primeList = generatePrimes(20);
    expect(primeList).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
  });
  
  test("Generate edge cases prime factors", () => {
    expect(generatePrimes(1)).toEqual([]);
    expect(generatePrimes(2)).toEqual([2]);
    expect(generatePrimes(3)).toEqual([2, 3]);
  });
  
  test("Generate prime factors of larger numbers", () => {
    const primes = generatePrimes(50);
    expect(primes).toEqual([
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
    ]);
    expect(primes.length).toBe(15);
  });
});

describe("getPrimeDistinctFactors function", () => {
  const primes = generatePrimes(100);
  test("Find distinct prime factors", () => {
    expect(getPrimeDistinctFactors(12, primes)).toEqual([2,3])
    expect(getPrimeDistinctFactors(15, primes)).toEqual([3,5])
    expect(getPrimeDistinctFactors(14, primes)).toEqual([2,7])
  })

  test("Find prime factors of prime numbers", () => {
    expect(getPrimeDistinctFactors(2, primes)).toEqual([2])
    expect(getPrimeDistinctFactors(11, primes)).toEqual([11])
    expect(getPrimeDistinctFactors(17, primes)).toEqual([17])
  })

  test("Find prime factors of powers number", () => {
    expect(getPrimeDistinctFactors(4, primes)).toEqual([2])
    expect(getPrimeDistinctFactors(8, primes)).toEqual([2])
    expect(getPrimeDistinctFactors(9, primes)).toEqual([3])
  })

  test("Find multiple disctinct prime factors", () => {
    expect(getPrimeDistinctFactors(1309, primes)).toEqual([7, 11, 17])
    expect(getPrimeDistinctFactors(1310, primes)).toEqual([2, 5, 131])
    expect(getPrimeDistinctFactors(1311, primes)).toEqual([3, 19, 23])
  })
})

describe("findConsecutiveNumbers function", () => {
  test("Find consecutive number sequence n=2", () => {
    expect(findConsecutiveNumbers(2)).toBe(14)
  })

  test("Find consecutive number sequence n=3", () => {
    expect(findConsecutiveNumbers(3)).toBe(1309)
  })

  test("Invalid input handled", () => {
    expect(findConsecutiveNumbers(0)).toBeNull()
    expect(findConsecutiveNumbers(-1)).toBeNull()
  })

  test("Limit parameter below known answer", () => {
    expect(findConsecutiveNumbers(2, 13)).toBeNull()
  })
})

describe('Solve function', () => {
  test('n=2 should complete within 1 second', () => {
      const start = performance.now();
      const result = solve(2);
      const duration = performance.now() - start;
      
      expect(result).toBe(14);
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
  });

  test('n=3 should complete within 5 second', () => {
      const start = performance.now();
      const result = solve(3);
      const duration = performance.now() - start;
      
      expect(result).toBe(1309);
      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
  });
});
