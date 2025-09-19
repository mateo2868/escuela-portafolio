import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authService = inject(AuthService)
  router = inject(Router)

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // Define your form controls here
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  async onSubmit(): Promise<void> {
    this.authService.signIn(this.loginForm.value)
    .then(res => {
      console.log("Login exitoso", res);
      // Redirigir a otra página, ejemplo:
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/nav/curso']);
    })
    .catch(err => {
      console.error("Error al iniciar sesión", err);
    });

    try {
      if(this.loginForm.valid) {
        await this.authService.singUp(this.loginForm.value)
        toast.success('Se creo correctamente')
      } else {

        toast.warning('Valide los datos del formulario')
      }
    } catch (error) {
      console.log(error)
    }
  }

}
