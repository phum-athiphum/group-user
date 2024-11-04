import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @HttpCode(200)
  async getUserByDepartment() {
    try {
      const data = await this.userService.userBydepartment();
      return data;
    } catch (error) {
      console.error('Error in getUserByDepartment:', error);
      throw new HttpException(
        'Failed to group user data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
