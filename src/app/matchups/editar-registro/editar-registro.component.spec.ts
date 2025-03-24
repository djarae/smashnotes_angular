import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRegistroComponent } from './editar-registro.component';

describe('EditarRegistroComponent', () => {
  let component: EditarRegistroComponent;
  let fixture: ComponentFixture<EditarRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarRegistroComponent]
    });
    fixture = TestBed.createComponent(EditarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
