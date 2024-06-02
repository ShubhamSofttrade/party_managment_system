import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsserviceService } from 'src/app/services/alertsservice.service';
import { LoginService } from 'src/app/services/login.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private alerts:AlertsserviceService,
    private toaster:ToasterService
  ) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    sessionStorage.clear();
    localStorage.clear();
  }

  Login() {
    if (this.loginForm.valid) {
      let username = this.loginForm.get('username')?.value;
      let password = this.loginForm.get('password')?.value;

      this.loginService.login(username, password).subscribe({
        next: (data: any) => {
          console.log(data);
          sessionStorage.setItem('Token', data.token.toString());
          this.router.navigate(['/party']);
        },
        error: (err) => {
          if(err){
            this.alerts.error(err.error.msg);
          }
          console.log(err);
          console.log(err.error.msg);
        },
        complete: () => {
          this.toaster.showSuccess("LogedIn in Successfully","Success")
          
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
