import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { PaymentsDocument } from './models/payments.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class PaymentsRepository extends AbstractRepository<PaymentsDocument> {
    protected readonly logger = new Logger(PaymentsRepository.name);
    constructor(
        @InjectModel(PaymentsDocument.name)
        reservationModel: Model<PaymentsDocument>,
        ){
            super(reservationModel);
        }  
}