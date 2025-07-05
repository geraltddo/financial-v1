import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductoService]
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia listar los productos', () => {
    expect(service.listarProductos()).toBeTruthy();
  });

  it('deberia crear un producto', () => {
    expect(service.crearProducto({
      id: "doce",
      name: 'nombre producto',
      description: 'creando el producto',
      logo: 'assets-12.png',
      date_release: new Date(),
      date_revision: new Date()
    })).toBeTruthy();
  });

  it('deberia actualizar un producto', () => {
    expect(service.actualizarProducto({
      id: "doce",
      name: 'nombre producto actualizado',
      description: 'actualizando el producto',
      logo: 'assets-12.png',
      date_release: new Date(),
      date_revision: new Date()
    })).toBeTruthy();
  });

  it('deberia eliminar un producto', () => {
    expect(service.eliminarProducto("doce")).toBeTruthy();
  });
});
