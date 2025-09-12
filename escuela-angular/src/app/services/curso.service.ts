import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, getDoc, where, query, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './auth.service';

export interface Curso {
  id: string; // en Firebase el id lo generamos con doc.id
  nombre: string;
  descripcion: string;
  profesorId: string;
  estudiantes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  firestore = inject(Firestore);
  private cursosRef = collection(this.firestore, 'cursos'); // referencia a la colección

  // 🔹 Crear curso
  create(curso: Curso): Promise<any> {
    return addDoc(this.cursosRef, curso);
  }

  // 🔹 Obtener todos los cursos (con id incluido)
  getAll(): Observable<Curso[]> {
    return collectionData(this.cursosRef, { idField: 'id' }) as Observable<Curso[]>;
  }

  // 🔹 Obtener un curso por id
  async getById(id: string): Promise<Curso | null> {
    const cursoDoc = doc(this.firestore, `cursos/${id}`);
    const snap = await getDoc(cursoDoc);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Curso;
    }
    return null;
  }

  async getEstudiantes(): Promise<User[]> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('rol', '==', 'estudiante'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
      return {
        uid: doc.id,
        ...doc.data()
      } as User;
    });
  }


  // 🔹 Actualizar curso
  update(id: string, curso: Partial<Curso>): Promise<void> {
    const cursoDoc = doc(this.firestore, `cursos/${id}`);
    return updateDoc(cursoDoc, { ...curso });
  }

  // 🔹 Eliminar curso
  delete(id: string): Promise<void> {
    const cursoDoc = doc(this.firestore, `cursos/${id}`);
    return deleteDoc(cursoDoc);
  }
}
