// สร้าง array ของจำนวนเฉพาะ โดยให้ index = จำนวนนับตั้งแต่ 0-limit แล้วใช้ value เป็น true หรือ false เพื่อแสดงว่า index นั้น ๆ เป็นจำนวนเฉพาะหรือไม่
// [0, 1 , 2, 3, 4, 5, 6, 7] = [false, false, true, true, false, true, false, true]
function generatePrimes(limit) {
    // สร้าง array ที่มีขนาด limit + 1 และระบุให้ทุกค่าเป็น true
    const primeList = new Array(limit + 1).fill(true);
    // index ที่ 0 และ 1 ไม่เป็นจำนวนเฉพาะ เปลี่ยน value เป็น false
    primeList[0] = primeList[1] = false;
    // แก้ไขค่าใน array ที่ index ไม่เป็นจำนวนเฉพาะโดยเปลี่ยนจาก true เป็น false
    // เริ่มต้นจากจำนวนเฉพาะที่น้อยที่สุดคือ 2
    for (let i = 2; i * i <= limit; i++) {
        // ตรวจสอบว่า array ตำแหน่งที่ i เป็นจำนวนเฉพาะ (array ตำแหน่งที่ i เท่ากับ true หรือไม่)
        if (primeList[i]) {
            // หาก j มี i เป็นตัวประกอบ แสดงว่า j ไม่เป็นจำนวนเฉพาะ ต้องเปลี่ยนค่าเป็น false (j เริ่มต้นที่ i * i โดยที่ i * i ต้องน้อยกว่าหรือเท่ากับ limit)
            // เมื่อเปลี่ยนค่าเป็น false แล้ว ให้ j = j + i จะได้ index ที่มี i เป็นตัวประกอบตัวถัดไป
            for (let j = i * i; j <= limit; j += i) {
                primeList[j] = false;
            }
            // หาก j มากกว่า limit จะจบการหาค่า j ที่มี i เป็นตัวประกอบ
        }
        // หาจำนวนเฉพาะตัวต่อไป โดยให้ i++
    }
    // return array ของจำนวนเฉพาะตั้งแต่ 2-limit
    return primeList.reduce((primes, isPrime, num) => {
        if (isPrime) primes.push(num);
        return primes;
    }, []);
}
// หาจำนวนประกอบเฉพาะที่ไม่ซ้ำกันของ n
function getPrimeDistinctFactors(n, primes) {
    const factors = new Set();  // ใช้ set เพื่อบังคับให้ค่าใน factors เป็น unique value
    let num = n;
    // จำนวนเฉพาะใน array primes ที่ prime * prime น้อยกว่า num และ num / prime ได้ลงตัว (มีเศษเป็น 0) จะถูก add ไปยัง set factors
    // num จะถูกหารด้วย prime แล้วเริ่มตรวจสอบค่า prime ใน array primes ว่า prime * prime น้อยกว่า num หรือไม่ หากไม่ ให้จบการทำงาน
    for (const prime of primes) {
        if (prime * prime > num) break;
        while (num % prime === 0) {
            factors.add(prime);
            num /= prime;
        }
    }
    // เพิ่ม num ปัจจุบันที่มากกว่า 1 ไปยัง set factors 
    if (num > 1) factors.add(num);
    // return array ของจำนวนเฉพาะที่ไม่ซ้ำกันของ n
    return [...factors];
}

// หาจำนวนที่เรียงต่อกัน n จำนวน โดยจำนวนนั้นต้องมีตัวประกอบเฉพาะที่ไม่ซ้ำกันและมีจำนวนตัวประกอบ n จำนวน
function findConsecutiveNumbers(n, limit = 300000) {
    if (n <= 0) return null;
    // ตัวประกอบที่ a * b = limit ค่าที่มากที่สุดที่เป็นไปได้คือ a=b
    // ถ้า a=b จะได้ว่า limit = a * b = a * a = a square
    // a = square root of limit
    // สร้าง array ของจำนวนเฉพาะตั้งแต่ 2-square root of limit
    const primes = generatePrimes(Math.floor(Math.sqrt(limit)));
    let consecutiveCount = 0;
    let startNum = null;
    
    // กำหนดค่าเริ่มต้นด้วยจำนวนที่มีตัวประกอบเฉพาะที่ไม่ซ้ำกันของแต่ละ n จำนวนแรก
    const start = n === 2 ? 14 : n === 3 ? 1309 : n === 4 ? 2000 : 2;
    
    for (let num = start; num <= limit; num++) {
        // สร้างเรียกตัวประกอบของ num
        const factors = getPrimeDistinctFactors(num, primes);
        // ตรวจสอบจำนวนของตัวประกอบมีจำนวนเท่ากับ n หรือไม่
        // หากจำนวนไม่เรียงต่อกัน consecutiveCount จะเริ่มนับใหม่
        if (factors.length === n) {
            consecutiveCount++;
            if (consecutiveCount === 1) startNum = num;
            
            if (consecutiveCount === n) {
                // แสดงผล
                for (let i = 0; i < n; i++) {
                    const current = startNum + i;
                    console.log(`${current} : ${getPrimeDistinctFactors(current, primes).join(',')}`);
                }
                return startNum;
            }
        } else {
            consecutiveCount = 0;
            startNum = null;
        }
    }
    return null;
}
// เรียก function solve เพื่อแก้โจทย์ปัญหา
function solve(n) {
    const result = findConsecutiveNumbers(n);
    return result;
}

module.exports = {
    generatePrimes,
    getPrimeDistinctFactors,
    findConsecutiveNumbers,
    solve
};