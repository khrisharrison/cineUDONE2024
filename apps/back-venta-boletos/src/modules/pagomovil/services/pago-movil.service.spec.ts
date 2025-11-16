import { Test, TestingModule } from '@nestjs/testing';
import { PagoMovilService } from './pago-movil.service';
import { getRepositoryToken } from '@nestjs/typeorm'; // Importar para obtener el token del repositorio
import { PagoMovil } from '../entities/pago-movil.entity'; // Asegúrate de que la entidad esté importada
import { Repository } from 'typeorm';                  //importar Repository

describe('pago_movil_service', () => {
  let service: PagoMovilService;
  let mockRepository: Partial<Repository<PagoMovil>>;

  beforeEach(async () => {
    // Crear un mock del repositorio
    mockRepository = {
      create: jest.fn(), // Mockear el método create
      save: jest.fn(),   // Mockear el método save
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagoMovilService,
        {
          provide: getRepositoryToken(PagoMovil), // Usar getRepositoryToken para inyectar el repositorio
          useValue: mockRepository, // Proveer el mock del repositorio
        },
      ],
    }).compile();

    service = module.get<PagoMovilService>(PagoMovilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); // Verificar que el servicio esté definido
  });
});


