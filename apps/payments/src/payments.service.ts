import { Inject,Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor (
    private readonly configService: ConfigService,
    private readonly paymentRepository: PaymentsRepository
    ){}

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto){
    return this.paymentRepository.create({
      
      number: card.number,
      amount: amount * 100,
      email,
      cvc: card.cvc,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      confirm: true,
      payment_method_types: 'card',
      currency: 'usd',
    })
  }
}
