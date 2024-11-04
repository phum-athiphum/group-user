import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { groupByDepartment } from 'src/utils/user';
import { DepartmentSummary } from 'src/types/user';

const dummyUrl = 'https://dummyjson.com/users';
@Injectable()
export class UserService {
  async userBydepartment(): Promise<DepartmentSummary[]> {
    try {
      const response = await axios.get(dummyUrl);
      let groupUser: DepartmentSummary[] = [];
      if (response.data.users && response.data.users.length > 0) {
        groupUser = groupByDepartment(response.data.users);
      }
      return groupUser;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetch dummy user');
    }
  }
}
