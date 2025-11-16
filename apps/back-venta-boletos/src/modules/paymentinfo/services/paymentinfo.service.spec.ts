import { Test, TestingModule } from '@nestjs/testing';
import { PaymentinfoService } from './paymentinfo.service';

describe('PaymentinfoService', () => {
  let service: PaymentinfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentinfoService],
    }).compile();

    service = module.get<PaymentinfoService>(PaymentinfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
