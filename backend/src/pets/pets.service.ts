import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPetSurveyResponse } from 'src/types';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async getPetSurvey(): Promise<GetPetSurveyResponse> {
    const pets = await this.findAll();
    const totalVotes = pets.reduce((acc, pet) => acc + pet.totalVotes, 0);

    const petsSurvey = pets.map((pet) => ({
      id: pet.id,
      name: pet.name,
      imageUrl: pet.imageUrl,
      score:
        totalVotes > 0
          ? Number(((pet.totalVotes / totalVotes) * 100).toFixed(2))
          : 0,
    }));

    return { totalVotes, pets: petsSurvey };
  }

  async vote(petId: number): Promise<void> {
    if (!petId || petId <= 0 || !Number.isInteger(petId)) {
      throw new BadRequestException('Pet ID must be a positive integer');
    }

    const pet = await this.petsRepository.findOneBy({ id: petId });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found`);
    }

    pet.totalVotes++;
    await this.petsRepository.save(pet);
  }
}
