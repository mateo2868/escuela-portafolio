import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
