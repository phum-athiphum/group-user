import { User } from 'src/types/user';
export function groupByDepartment(data: User[]) {
  const result: any = {};

  data.forEach((user) => {
    const department = user.company.department;

    // เก็บ department เช้าไปใน result ถ้ายังไม่มี department น้ั้นๆ ต้องสร้างใหม่
    if (!result[department]) {
      result[department] = {
        male: 0,
        female: 0,
        ageRange: '',
        hair: {},
        addressUser: {},
      };
    }

    // นับเพศโดยบวกตาม fied จาก user.gender แล้วบวกเข้า field ที่ตรงกัยใน result
    result[department][user.gender]++;

    // เช๊ค ageRange มีค่าหรือไม่มีค่า
    if (!result[department].ageRange) {
      // ถ้าไม่มีค่า ให้กำหนดเป็นอายุของผู้ใช้คนแรก เช่น "28-28"
      result[department].ageRange = `${user.age}-${user.age}`;
    } else {
      // แยกค่าช่วงอายุเดิมออกเป็น minAge และ maxAge
      const [currentMinAge, currentMaxAge] = result[department].ageRange
        .split('-')
        .map(Number);

      // เทียบค่าสูงสุดของตัวที่มีอยู่แล้วกับต่าใหม่
      const newMinAge = Math.min(currentMinAge, user.age);
      const newMaxAge = Math.max(currentMaxAge, user.age);

      // อัปเดตค่า ageRange ด้วยช่วงอายุใหม่
      result[department].ageRange = `${newMinAge}-${newMaxAge}`;
    }

    // ดึงค่าสีผมของผู้ใช้
    const hairColor = user.hair.color;

    // ตรวจสอบว่ามีการนับสีผมนี้อยู่ในแผนกหรือไม่
    if (!result[department].hair[hairColor]) {
      // ถ้ายังไม่มี ให้เริ่มนับจาก 0
      result[department].hair[hairColor] = 0;
    }

    // เพิ่มจำนวนผู้ใช้ที่มีสีผมนี้ขึ้น 1
    result[department].hair[hairColor] += 1;

    // format ที่อยู่
    const userFullName = `${user.firstName}${user.lastName}`;
    result[department].addressUser[userFullName] = user.address.postalCode;
  });

  return result;
}
