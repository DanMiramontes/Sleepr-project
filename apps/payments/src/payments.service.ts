import { Inject,Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { PaymentsRepository } from './payments.repository';
import { NOTIFICATIONS_SERVICE,CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  constructor (
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notficationsService: ClientProxy,
    private readonly paymentRepository: PaymentsRepository
    ){}

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto){
    const payment =  this.paymentRepository.create({
      
      number: card.number,
      amount: amount * 100,
      email,
      cvc: card.cvc,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      confirm: true,
      payment_method_types: 'card',
      currency: 'usd',
    });

    this.notficationsService.emit('notify_email',{ email, text: `Your payment of ${amount} has completed successfully.`, });

    return payment;
  }
}
