import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '@app/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
  ){}

  async create(
    createReservationDto: CreateReservationDto,
    {email, _id: userId}:UserDto,
  ){
    return this.reservationRepository.create({
      ...createReservationDto,
      invoiceId: randomUUID(),
      timestamp: new Date(),
      userId
    });
  }

  async findAll(){
    return this.reservationRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto){
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    )
  }

  async remove(_id: string){
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}