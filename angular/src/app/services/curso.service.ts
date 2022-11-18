import { QueryService } from './query.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Curso {
  id: number;
  nombre_curso: string;
  creditos: number;
  check?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private query: QueryService) { }

  create = (params: Curso): Observable<any> => this.query.post<any>('/curso', params);
  getAll = (): Observable<Curso[]> => this.query.get<Curso[]>('/curso');
  update = (params: Curso): Observable<any> => this.query.put<any>(`/curso`, params);
  delete = (id: number): Observable<any> => this.query.delete<any>(`/curso/${id}`);

}
