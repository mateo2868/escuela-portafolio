import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoComponent } from './pages/curso/curso.component';

const routes: Routes = [
  { path: 'curso', component: CursoComponent},
  { path: 'estudiante', component: EstudianteComponent},
  // { path: 'validarContrato', component: ValidateContractComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
