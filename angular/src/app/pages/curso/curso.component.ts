import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso, CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  cursoForm: FormGroup;
  listCursos: Curso[];
  constructor(private fb: FormBuilder, private cursoSrv: CursoService) { }

  ngOnInit(): void {

    // inicializacion de formulario para curso
    this.formInit();
    this.getAll();
  }

  formInit(curso: Curso = null) {
    this.cursoForm = this.fb.group({
      id: [curso ? curso.id: null],
      nombre_curso: [curso ? curso.nombre_curso: '', Validators.required],
      creditos: [curso ? curso.creditos: '', Validators.required]
    })
  }

  // consulta de todos los cursos
  getAll() {
    this.cursoSrv.getAll().subscribe(cursos => {
      this.listCursos = cursos;
    })
  }

  // Valida formulario y llama ruta de creacion de curso
  create() {
    if(this.cursoForm.valid) {
      this.cursoSrv.create(this.cursoForm.value).subscribe(resp => {
        console.log('Se guardó correctamente');
        this.getAll();
        this.cursoForm.reset();
      })
    }
  }

  edit() {
    if(this.cursoForm.valid) {
      this.cursoSrv.update(this.cursoForm.value).subscribe(resp => {
        console.log('Se editó correctamente');
        this.getAll();
        this.cursoForm.reset();
      })
    }
  }

  destroy(id: number) {
    this.cursoSrv.delete(id).subscribe(curso => {
      console.log('se eliminó');
      this.getAll();
    })
  }

}
