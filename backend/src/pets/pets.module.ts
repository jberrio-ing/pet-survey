import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsSeedService } from './seed';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetsController],
  providers: [PetsService, PetsSeedService],
})
export class PetsModule {}
