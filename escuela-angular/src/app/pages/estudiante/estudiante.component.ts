import { Estudiantes, EstudianteService } from './../../services/estudiante.service';
import { Curso, CursoService } from './../../services/curso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {
  estudianteForm: FormGroup;
  listEstudiante: Estudiantes[];
  listCursos: Curso[];
  constructor(private fb: FormBuilder, private estudianteSrv: EstudianteService, private cursoSrvc: CursoService) { }

  ngOnInit(): void {

    this.formInit();
    this.getAll();
  }

  // inicializacion de formulario para estudiante
  formInit(estudiante: Estudiantes = null) {
    this.estudianteForm = this.fb.group({
      id: [estudiante ? estudiante.id: null],
      nombres: [estudiante ? estudiante.nombres : ''],
      apellidos: [estudiante ? estudiante.apellidos : ''],
      grado: [estudiante ? estudiante.grado : ''],
      grupo: [estudiante ? estudiante.grupo : ''],
      correo: [estudiante ? estudiante.correo : ''],
      ubicacion: [estudiante ? estudiante.ubicacion : ''],
    })
  }

  modalInit(id_estudiante: number) {
    this.estudianteSrv.getAllCurso(id_estudiante)
  }

  // consulta de todos los cursos
  getAll() {
    this.estudianteSrv.getAll().subscribe(estudiantes => {
      this.listEstudiante = estudiantes;
    })

    this.cursoSrvc.getAll().subscribe(cursos => {
      this.listCursos = cursos;
    })
  }

  // Valida formulario y llama ruta de creacion de curso
  create() {
    if(this.estudianteForm.valid) {
      this.estudianteSrv.create(this.estudianteForm.value).subscribe(resp => {
        console.log('Se guardó correctamente');
        this.getAll();
        this.estudianteForm.reset();
      })
    }
  }

  edit() {
    if(this.estudianteForm.valid) {
      this.estudianteSrv.update(this.estudianteForm.value).subscribe(resp => {
        console.log('Se editó correctamente');
        this.getAll();
        this.estudianteForm.reset();
      })
    }
  }

  destroy(id: number) {
    this.estudianteSrv.delete(id).subscribe(curso => {
      console.log('se eliminó');
      this.getAll();
    })
  }
}
