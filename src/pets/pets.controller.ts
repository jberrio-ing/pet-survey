import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { GetPetSurveyResponse } from 'src/types';

@Controller('api/pet-survey')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async getPetSurvey(): Promise<GetPetSurveyResponse> {
    try {
      return await this.petsService.getPetSurvey();
    } catch {
      throw new InternalServerErrorException(
        'Failed to retrieve pet survey data',
      );
    }
  }

  @Post('vote')
  @HttpCode(HttpStatus.OK)
  async vote(@Body('petId') petId: number): Promise<{ message: string }> {
    if (petId === undefined || petId === null) {
      throw new BadRequestException(
        'Pet ID is required and cannot be null or undefined',
      );
    }

    await this.petsService.vote(petId);
    return { message: 'Vote registered successfully' };
  }
}
