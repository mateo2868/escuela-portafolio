import { Observable } from 'rxjs';
import { QueryService } from './query.service';
import { inject, Injectable } from '@angular/core';
import { User } from './auth.service';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

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
  firestore = inject(Firestore);
  private usuarioRef = collection(this.firestore, 'users');

  async getAll(): Promise<User[]> {
    const q = query(this.usuarioRef, where('rol', '==', 'estudiante'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
      return {
        uid: doc.id,
        ...doc.data()
      } as User;
    });
  };

  // 🔹 Crear curso
  create(user: User): Promise<any> {
    return addDoc(this.usuarioRef, user);
  }

  // 🔹 Actualizar curso
  update(id: string, user: Partial<User>): Promise<void> {
    const cursoDoc = doc(this.firestore, `cursos/${id}`);
    return updateDoc(cursoDoc, { ...user });
  }

  // 🔹 Eliminar curso
  delete(id: string): Promise<void> {
    const cursoDoc = doc(this.firestore, `cursos/${id}`);
    return deleteDoc(cursoDoc);
  }
}
