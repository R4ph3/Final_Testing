import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe cargar los hashes al inicializar', () => {
    const dummyHashes = [
      { hash: 'a'.repeat(64), name: 'TestMalware', family: 'Troyano' }
    ];

    const req = httpMock.expectOne('http://localhost:3000/api/hashes');
    expect(req.request.method).toBe('GET');
    req.flush(dummyHashes);

    expect(component.hashes.length).toBe(1);
    expect(component.hashes[0].name).toBe('TestMalware');
  });

  it('debe mostrar error si se intenta agregar hash inválido', () => {
    component.hash = 'invalido';
    component.name = 'Fake';
    component.family = 'Keylogger';

    component.addHash();

    const req = httpMock.expectOne('http://localhost:3000/api/hashes');
    expect(req.request.method).toBe('POST');
    req.flush({ error: 'El hash no es válido (debe ser SHA256)' }, { status: 400, statusText: 'Bad Request' });

    expect(component.error).toBe('El hash no es válido (debe ser SHA256)');
  });

  it('debe limpiar los campos tras agregar correctamente', () => {
    component.hash = 'b'.repeat(64);
    component.name = 'Limpieza';
    component.family = 'Troyano';

    component.addHash();

    const reqPost = httpMock.expectOne('http://localhost:3000/api/hashes');
    expect(reqPost.request.method).toBe('POST');
    reqPost.flush({ message: 'Agregado correctamente' });

    const reqGet = httpMock.expectOne('http://localhost:3000/api/hashes');
    reqGet.flush([{ hash: 'b'.repeat(64), name: 'Limpieza', family: 'Troyano' }]);

    expect(component.hash).toBe('');
    expect(component.name).toBe('');
    expect(component.family).toBe('');
  });

  it('no debe hacer petición si campos están vacíos', () => {
    component.hash = '';
    component.name = '';
    component.family = '';

    component.addHash();

    // No se espera ninguna petición POST si los campos están vacíos
    httpMock.expectNone('http://localhost:3000/api/hashes');
  });

  it('debe mostrar hashes en el DOM', () => {
    const dummyHashes = [
      { hash: 'f'.repeat(64), name: 'VisibleMalware', family: 'Spyware' }
    ];

    const req = httpMock.expectOne('http://localhost:3000/api/hashes');
    req.flush(dummyHashes);
    fixture.detectChanges();

    const hashItems = fixture.debugElement.queryAll(By.css('.hash-item'));
    expect(hashItems.length).toBe(1);
    expect(hashItems[0].nativeElement.textContent).toContain('VisibleMalware');
  });
});
