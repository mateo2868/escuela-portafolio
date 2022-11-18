import { Observable } from 'rxjs';
import { QueryService } from './query.service';
import { Injectable } from '@angular/core';

export interface Estudiantes {
  id: number;
  apellidos: string;
  grado: number;
  grupo: string;
  correo: string;
  estado: number;
  ubicacion: string;
  nombres: string;
}

export interface CursosEstudiante {
  id: number;
  id_estudiante: number;
  id_curso: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  constructor(private query: QueryService) { }

  create = (params: Estudiantes): Observable<any> => this.query.post<any>('/estudiante', params);
  getAll = (): Observable<Estudiantes[]> => this.query.get<Estudiantes[]>('/estudiante');
  update = (params: Estudiantes): Observable<any> => this.query.put<any>(`/estudiante`, params);
  delete = (id: number): Observable<any> => this.query.delete<any>(`/estudiante/${id}`);


  createCurso = (params: CursosEstudiante): Observable<any> => this.query.post<any>('/estudiante/cursos', params);
  getAllCurso = (id_estudiante: number): Observable<CursosEstudiante[]> => this.query.get<CursosEstudiante[]>(`/estudiante/cursos/${id_estudiante}`);
}
