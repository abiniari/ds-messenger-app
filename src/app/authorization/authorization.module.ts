import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CoreModule } from '../core/core.module';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPageComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    NgxDropzoneModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CoreModule
  ],
  exports:[
    LoginPageComponent,
    LoginDialogComponent

  ]
})
export class AuthorizationModule { }
