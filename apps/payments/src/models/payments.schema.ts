import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false})

export class PaymentsDocument extends AbstractDocument {
    @Prop()
    email: string;
    @Prop()
    confirm: boolean;
    @Prop()
    payment_method_types: string;
    @Prop()
    currency: string;
    @Prop()
    cvc: string;
    @Prop()
    exp_month: number;
    @Prop()
    exp_year: number;
    @Prop()
    number: string;

    @Prop()
    amount: number;
}

export const PaymentsSchema = SchemaFactory.createForClass(PaymentsDocument);