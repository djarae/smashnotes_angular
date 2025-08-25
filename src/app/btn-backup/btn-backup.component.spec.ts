import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBackupComponent } from './btn-backup.component';

describe('BtnBackupComponent', () => {
  let component: BtnBackupComponent;
  let fixture: ComponentFixture<BtnBackupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnBackupComponent]
    });
    fixture = TestBed.createComponent(BtnBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
