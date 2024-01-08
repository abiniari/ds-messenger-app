import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/authorization.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  error!: string;
  newUser: boolean = true;
  showPassword = false;
  images: File[] = [];

  firstNameControl: FormControl;

  constructor(private fb: FormBuilder,
    private authorizationService: AuthorizationService) {

    this.firstNameControl = this.fb.control('', this.newUser ? null : Validators.required),
      this.loginForm = this.fb.group({
        email: this.fb.control('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
        password: this.fb.control('', Validators.required),
        firstName: this.firstNameControl
      })

  }

  ngOnInit(): void { }


  createNewUser() {
    const { email, password, firstName } = this.loginForm.value;
    this.authorizationService.signUpUser(email, password, firstName)
      .then(() => {
        this.loginForm.reset();
        this.newUser = true;
        this.loginForm.removeControl('firstName');
      })
      .catch((error: { code: string, message: string }) => {
        if (error.code === 'auth/weak-password')
          this.error = 'The password should at least have 6 characters';

        if (error.code === 'auth/email-already-in-use') {
          this.error = 'The email address is already in use by another account.'
        }
      })
  }


  login(): void {
    const { email, password } = this.loginForm.value
    this.authorizationService.singInUser(email, password)
      .catch((error: { code: string, message: string }) => {
        switch (error.code) {
          case 'auth/user-not-found':
            this.error = 'The email address is invalid. The user does not exist or has been removed.';
            break;
          case 'auth/wrong-password':
            this.error = 'The password is invalid.';
            break;
          case 'auth/invalid-email':
            this.error = 'The email address is invalid.';
            break;
          default:
            this.error = 'The credentials are invalid.';
            break;
        }
      });
  }

  newUserChange() {
    this.newUser = !this.newUser;
    this.loginForm.reset();
    if(this.error) {this.error=''}
    this.newUser ? this.loginForm.removeControl('firstName') : this
    if (this.newUser) {
      this.loginForm.removeControl('firstName');
    } else {
      this.loginForm.addControl('firstName', this.firstNameControl)
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  onSelect(event: any) {
    this.images.push(...event.addedFiles);
  }

  onRemove(f: any) {
    this.images.pop()
  }

}
