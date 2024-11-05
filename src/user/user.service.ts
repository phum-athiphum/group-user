import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { groupByDepartment } from 'src/utils/user';
import { DepartmentSummary } from 'src/types/user';

const dummyUrl = 'https://dummyjson.com/users';
@Injectable()
export class UserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async userBydepartment(): Promise<DepartmentSummary[]> {
    const cacheKey = 'departmentSummary';
    let groupUser: DepartmentSummary[] = [];

    // เช๊คว่ามี department summary ที่ cache ไว้ไหม ถ้ามี return เลย

    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    // ถ้าไม่มีหลัง process ใหม่พร้อม cahce ตัว data summary อันใหม่
    try {
      const response = await axios.get(dummyUrl);
      if (response.data.users && response.data.users.length > 0) {
        groupUser = groupByDepartment(response.data.users);
        await this.cacheManager.set(cacheKey, groupUser, { ttl: 3600 });
      } else {
        groupUser = [];
      }

      return groupUser;

      // จริงๆมีรูปแบบ logic อีกท่าที่สามารถทํําด้คือ เรา cahe ตัว  dummy jason data ไว้ด้วยแล้วตอนแรก api เราเทียบกับตัว ที่ dummy json อันใหม่ถ้าเหมือนเกิมให้ return ตัว departmentSummary ตัวเดิมถ้าไม่ ก็ process ตัว departmentSummary ใหม่ แต่ถ้าวิธีนี้ตอนที่เราเทียบข้อมูลถ้าข้อมูลเยอะก็อาจจะกระทบ performance ได้
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching dummy users');
    }
  }
}
