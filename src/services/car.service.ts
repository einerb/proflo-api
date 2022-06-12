import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CarEntity, UserEntity } from 'src/entities';
import { CreateCarDto } from 'src/entities/dto';
import { UpdateCarDto } from 'src/entities/dto/update-car.dto';
import { Roles } from 'src/entities/enum/role.enum';
import { UserRepository } from 'src/repositories';
import { CarRepository } from 'src/repositories/car.repository';
import { ApiResponse, ERROR, SUCCESS } from 'src/responses';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity) private carRepository: CarRepository,
    @InjectRepository(UserEntity) private userRepository: UserRepository,
  ) {}

  async findById(plate: string): Promise<ApiResponse> {
    const car = await this.carRepository
      .createQueryBuilder('car')
      .where('car.plate = :plate AND car.state = true', {
        plate: plate,
      })
      .getOne();

    if (!car) return new ApiResponse(false, ERROR.CAR_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.CAR_FOUND, car);
  }

  validatePlate(plate: string) {
    let regexPlate = new RegExp(
      /^[a-zA-Z]{3}[0-9]{3}|[a-zA-Z]{3}[0-9]{2}[a-zA-Z]/g,
    );
    if (regexPlate.test(plate)) return true;

    return false;
  }

  async create(userDecode: any, dto: CreateCarDto): Promise<ApiResponse> {
    if (userDecode.role !== Roles.USER) {
      if (!this.validatePlate(dto.plate))
        return new ApiResponse(false, ERROR.PLATE_NOT_VALID);

      let car = await this.carRepository.findOne({
        where: {
          plate: dto.plate,
        },
      });
      let carVin = await this.carRepository.findOne({
        where: {
          noVin: dto.noVin,
        },
      });
      let carSerie = await this.carRepository.findOne({
        where: {
          noSerie: dto.noSerie,
        },
      });
      let carMotor = await this.carRepository.findOne({
        where: {
          noMotor: dto.noMotor,
        },
      });
      let carChasis = await this.carRepository.findOne({
        where: {
          noChasis: dto.noChasis,
        },
      });

      if (car) return new ApiResponse(false, ERROR.CAR_EXIST);
      if (carVin) return new ApiResponse(false, ERROR.CAR_UNIQUE_VIN);
      if (carSerie) return new ApiResponse(false, ERROR.CAR_UNIQUE_SERIE);
      if (carMotor) return new ApiResponse(false, ERROR.CAR_UNIQUE_MOTOR);
      if (carChasis) return new ApiResponse(false, ERROR.CAR_UNIQUE_CHASIS);

      const user = await this.userRepository.findOne({
        where: { identification: dto.identificationOwner },
      });
      if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

      car = await this.carRepository.create(dto);

      await car.save();

      user.car = <any>car.id;
      await this.userRepository.save(user);

      return new ApiResponse(true, SUCCESS.CAR_CREATED, car);
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }

  async update(plate: string, dto: UpdateCarDto): Promise<ApiResponse> {
    if (!this.validatePlate(plate))
      return new ApiResponse(false, ERROR.PLATE_NOT_VALID);

    const car = await this.carRepository.findOne({
      where: { plate: plate },
    });

    if (!car) return new ApiResponse(false, ERROR.CAR_NOT_FOUND);

    await this.carRepository.update({ plate: plate }, dto);

    return new ApiResponse(true, SUCCESS.CAR_UPDATED, car);
  }

  async delete(userDecode: any, id: number): Promise<any> {
    if (userDecode.role === Roles.ROOT || userDecode.role === Roles.ADMIN) {
      const car = await this.carRepository.findOne({
        where: { id: id },
      });

      if (!car) return new ApiResponse(false, ERROR.CAR_NOT_FOUND);

      this.carRepository
        .createQueryBuilder()
        .delete()
        .from(CarEntity)
        .where('id = :id', {
          id: id,
        })
        .execute();

      return new ApiResponse(true, SUCCESS.CAR_DELETED);
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }
}
