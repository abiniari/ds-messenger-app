import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {
    setTimeout(() => { this.dialogRef.close() }, 4000)
  }

}
