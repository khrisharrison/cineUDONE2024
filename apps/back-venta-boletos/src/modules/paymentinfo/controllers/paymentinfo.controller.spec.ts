import { Test, TestingModule } from '@nestjs/testing';
import { PaymentinfoController } from './paymentinfo.controller';

describe('PaymentinfoController', () => {
  let controller: PaymentinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentinfoController],
    }).compile();

    controller = module.get<PaymentinfoController>(PaymentinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
