import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { registerconfirm, userregister } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router) {

  }

  _response: any;
  passwordMismatch: boolean = false;

  _regform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')])),
    confirmpassword: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])),
    phone: this.builder.control('', Validators.required)
  })

  proceedregister() {
    if (this._regform.valid) {
      // Check if passwords match
      if (this._regform.value.password !== this._regform.value.confirmpassword) {
        this.passwordMismatch = true;
        this.toastr.error('Passwords do not match.', 'Validation Error');
        return;
      }
      let _obj: userregister = {
        userName: this._regform.value.username as string,
        userType: "Admin",
        phone: this._regform.value.phone as string,
        userEmail: this._regform.value.email as string,
        phash: this._regform.value.password as string,
        securityQuestion: "What is your favorite color?",
      }
      this.service.Userregisteration(_obj).subscribe(item => {
        this._response = item;
        console.log(this._response.isSuccess);
        if (this._response.isSuccess) {
          // let _confirmobj: registerconfirm = {
          //   userid: this._response.message,
          //   username: _obj.userName,
          //   otptext: ''
          // }
          // this.service._registerresp.set(_confirmobj);
          this.toastr.success('Completed the registration', 'Registration');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error('Failed due to : ' + this._response.message, 'Registration Failed')
        }
      });

    }else {
      this.toastr.error('Form is invalid. Please check the error messages for each field.', 'Validation Error');
    }
  }

}
