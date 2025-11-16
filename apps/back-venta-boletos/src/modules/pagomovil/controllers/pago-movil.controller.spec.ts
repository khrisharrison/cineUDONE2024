import { Test, TestingModule } from '@nestjs/testing';
import { PagoMovilController } from './pago-movil.controller';
import { PagoMovilService } from '../services/pago-movil.service';
//import { createpagomovil } from './pago-movil.entity'; // Asegúrate de importar la entidad

describe('pago_movil_controller', () => {
  let controller: PagoMovilController;
  let service: PagoMovilService;

  const mockService = {
    create_pago: jest.fn(), // Como estamos en un entorno de prueba, generalmente es mejor "mockear" el
                            // repositorio para que puedamos probar
                            ///el comportamiento del servicio sin depender de una base de datos real.
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagoMovilController],
      providers: [
        {
          provide: PagoMovilService,
          useValue: mockService, // Usar el mock en lugar del servicio real
        },
      ],
    }).compile();

    controller = module.get<PagoMovilController>(PagoMovilController);
    service = module.get<PagoMovilService>(PagoMovilService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
