import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Curso, CursoService } from '../../../services/curso.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { User } from '../../../services/auth.service';

declare var bootstrap: any

export interface estudiantesSelect {
  nombre: string;
  uid: string;
}

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule],
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  cursoForm: FormGroup;
  listCursos: Curso[];
  fb = inject(FormBuilder)
  cursoSrv = inject(CursoService)
  listEstudiantes: estudiantesSelect[];


  ngOnInit(): void {
    // inicializacion de formulario para curso
    this.formInit();
    this.getEstudiantes();
    this.getAll();
  }

  getEstudiantes() {
    this.cursoSrv.getEstudiantes().then(estudiantes => {
      console.log(estudiantes);
      this.listEstudiantes = estudiantes.map(a => { return {nombre: a.nombre, uid: a.uid}});
    })
  }

  formInit(curso: Curso | null = null) {
    this.cursoForm = this.fb.group({
      id: [curso ? curso.id: null],
      nombre: [curso ? curso.nombre: '', Validators.required],
      descripcion: [curso ? curso.descripcion: '', Validators.required],
      estudiantes: [curso ? curso.estudiantes: []]
    })
  }

  // consulta de todos los cursos
  getAll() {
    this.cursoSrv.getAll().subscribe(cursos => {
      console.log(cursos);
      this.listCursos = cursos;
    })
  }

  // Valida formulario y llama ruta de creacion de curso
  create() {
    console.log(this.cursoForm.value);
    if(this.cursoForm.valid) {
      this.cursoSrv.create(this.cursoForm.value).then(resp => {
        console.log('Se guardó correctamente');
        this.closeModal()
        this.getAll();
        this.cursoForm.reset();
      })
    }
  }

  edit() {
    if(this.cursoForm.valid) {
      this.cursoSrv.update(this.cursoForm.controls['id'].value, this.cursoForm.value).then(resp => {
        console.log('Se editó correctamente');
        this.closeModal()
        this.getAll();
        this.cursoForm.reset();
      })
    }
  }

  destroy(id: string) {
    this.cursoSrv.delete(id).then(curso => {
      console.log('se eliminó');
      this.getAll();
    })
  }

  closeModal(): void {
    const modal = document.getElementById('cursoModal');
    if (modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
      modalInstance.hide();
    }
  }

}
