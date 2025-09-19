import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
loginForm: FormGroup;
  authService = inject(AuthService)
  router = inject(Router)

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // Define your form controls here
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit(): Promise<void> {
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
