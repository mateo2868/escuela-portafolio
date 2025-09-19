import { User } from './../../../services/auth.service';
import { Estudiantes, EstudianteService } from '../../../services/estudiante.service';
import { Curso, CursoService } from '../../../services/curso.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {
  estudianteForm: FormGroup;
  listEstudiante: User[];
  listCursos: Curso[];
  constructor(private fb: FormBuilder, private estudianteSrv: EstudianteService, private cursoSrvc: CursoService) { }

  ngOnInit(): void {
    // this.formInit();
    this.getAll();
  }

  // inicializacion de formulario para estudiante
  formInit(estudiante: User | null = null) {
    this.estudianteForm = this.fb.group({

      uid: [estudiante ? estudiante.uid: ''],
      nombre: [estudiante ? estudiante.nombre: ''],
      email: [estudiante ? estudiante.email: ''],
      rol: [estudiante ? estudiante.rol: ''],

      // id: [estudiante ? estudiante.id: null],
      // nombres: [estudiante ? estudiante.nombres : ''],
      // apellidos: [estudiante ? estudiante.apellidos : ''],
      // grado: [estudiante ? estudiante.grado : ''],
      // grupo: [estudiante ? estudiante.grupo : ''],
      // correo: [estudiante ? estudiante.correo : ''],
      // ubicacion: [estudiante ? estudiante.ubicacion : ''],
    })
  }

  modalInit(id_estudiante: string) {
    // this.estudianteSrv.getAllCurso(id_estudiante)
  }

  // consulta de todos los cursos
  getAll() {
    this.estudianteSrv.getAll().then(estudiantes => {
      console.log(this.listEstudiante)
      this.listEstudiante = estudiantes;
    })

    this.cursoSrvc.getAll().subscribe(cursos => {
      this.listCursos = cursos;
    })
  }

}
