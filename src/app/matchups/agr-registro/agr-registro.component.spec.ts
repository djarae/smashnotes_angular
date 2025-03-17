import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrRegistroComponent } from './agr-registro.component';

describe('AgrRegistroComponent', () => {
  let component: AgrRegistroComponent;
  let fixture: ComponentFixture<AgrRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgrRegistroComponent]
    });
    fixture = TestBed.createComponent(AgrRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
