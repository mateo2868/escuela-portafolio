import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // Define your form controls here
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit(): void {
    // Handle form submission logic here
    console.log('Form submitted', this.loginForm.value);
  }

}
