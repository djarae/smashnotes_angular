import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-backup',
  templateUrl: './btn-backup.component.html',
  styleUrls: ['./btn-backup.component.css']
})
export class BtnBackupComponent {

  goToBackup(): void {
    window.open('https://smashnotes-backups.onrender.com/Backup&EnvioSQLGmail', '_blank');
  }

}
