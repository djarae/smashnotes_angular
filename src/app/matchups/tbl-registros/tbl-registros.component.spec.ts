import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblRegistrosComponent } from './tbl-registros.component';

describe('TblRegistrosComponent', () => {
  let component: TblRegistrosComponent;
  let fixture: ComponentFixture<TblRegistrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TblRegistrosComponent]
    });
    fixture = TestBed.createComponent(TblRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
