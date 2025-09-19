import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NavComponent } from './pages/nav/nav.component';
import { CursoComponent } from './pages/nav/curso/curso.component';
import { EstudianteComponent } from './pages/nav/estudiante/estudiante.component';
import { PerfilComponent } from './pages/nav/perfil/perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'nav', component: NavComponent, children: [
    { path: 'perfil', component: PerfilComponent},
    { path: 'estudiantes', component: EstudianteComponent},
    { path: 'curso', component: CursoComponent},
  ]}

];
