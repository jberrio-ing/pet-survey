import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';

interface PetSeed {
  name: string;
  imageUrl: string;
}

@Injectable()
export class PetsSeedService implements OnModuleInit {
  private readonly logger = new Logger(PetsSeedService.name);

  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const count = await this.petsRepository.count();

    // Solo ejecutar el seed si la tabla está vacía
    if (count === 0) {
      this.logger.log('Iniciando seed de mascotas...');
      await this.insertPets();
      this.logger.log('Seed de mascotas completado exitosamente');
    } else {
      this.logger.log(
        `La tabla de mascotas ya contiene ${count} registros. Seed omitido.`,
      );
    }
  }

  private async insertPets() {
    const petsData: PetSeed[] = [
      {
        name: 'Perro',
        imageUrl:
          'https://img.freepik.com/premium-psd/3d-cartoon-dog-avatar-3d-puppy-3d-cartoon-pet-avatar-cute-animal-face-png-smiling-puppy-character_532044-1625.jpg?w=360',
      },
      {
        name: 'Gato',
        imageUrl:
          'https://img.freepik.com/free-vector/sweet-eyed-kitten-cartoon-character_1308-133242.jpg?semt=ais_hybrid&w=740&q=80',
      },
      {
        name: 'Conejo',
        imageUrl:
          'https://img.freepik.com/vector-gratis/vector-personaje-dibujos-animados-lindo-conejo_1308-138387.jpg?semt=ais_hybrid&w=740&q=80',
      },
    ];

    try {
      // Insertar todas las mascotas
      const pets = this.petsRepository.create(petsData);
      await this.petsRepository.save(pets);

      this.logger.log(`${petsData.length} mascotas insertadas correctamente`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error('Error al insertar mascotas:', errorMessage);
      throw error;
    }
  }

  /**
   * Método manual para reiniciar el seed (útil para desarrollo)
   * Elimina todos los registros e inserta nuevamente
   */
  async resetSeed() {
    this.logger.warn('Reiniciando seed de mascotas...');

    await this.petsRepository.clear();
    await this.insertPets();

    this.logger.log('Seed reiniciado exitosamente');
  }

  /**
   * Método para agregar mascotas adicionales sin eliminar las existentes
   */
  async addAdditionalPets(petsData: PetSeed[]) {
    try {
      const pets = this.petsRepository.create(petsData);
      await this.petsRepository.save(pets);

      this.logger.log(
        `${petsData.length} mascotas adicionales insertadas correctamente`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(
        'Error al insertar mascotas adicionales:',
        errorMessage,
      );
      throw error;
    }
  }
}
