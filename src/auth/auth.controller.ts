import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from 'src/types/payload';
import { User } from 'src/utilities/user.decorator';
import { SellerGuards } from 'src/guards/seller.guards';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), SellerGuards)
  async findAll(@User() user) {
    return { user }
  }
  
  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    };
    const token = await this.authService.signPayload(payload);
    return  {
      user, token
    }
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    };
    const token = await this.authService.signPayload(payload);
    return  {
      user, token
    }
  }
}
