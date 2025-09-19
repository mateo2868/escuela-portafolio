import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

export interface User {
  uid: string;
  nombre: string;
  email: string;
  rol: string;
}

export interface UserRegister extends User {
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);

   // 🔹 Login: inicia sesión y asegura que el usuario esté en Firestore
  async signIn(user: Pick<UserRegister, 'email' | 'password'>): Promise<UserRegister | null> {
    try {
      const cred = await signInWithEmailAndPassword(this._auth, user.email, user.password);
      const uid = cred.user.uid;

      const userRef = doc(this._firestore, 'users', uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        // 🔹 Si no existe, lo registramos en la colección
        const userData: UserRegister = {
          uid,
          nombre: cred.user.displayName ?? '',
          email: cred.user.email ?? '',
          rol: 'usuario',
          password: ''
        };
        await setDoc(userRef, userData);
        return userData;
      }

      return snap.data() as UserRegister;
    } catch (error) {
      console.error("Error en login:", error);
      return null;
    }
  }

  // 🔹 Registro: crea usuario en Auth y Firestore
  async singUp(user: UserRegister): Promise<UserRegister | null> {
    try {
      const cred: UserCredential = await createUserWithEmailAndPassword(
        this._auth,
        user.email,
        user.password
      );

      const uid = cred.user.uid;
      const userData: UserRegister = {
        ...user,
        uid,
      };

      // 🔹 Guardar usuario en Firestore
      await setDoc(doc(this._firestore, 'users', uid), userData);

      return userData;
    } catch (error) {
      console.error("Error en registro:", error);
      return null;
    }
  }

  // Opcional: cerrar sesión
  signOut() {
    return this._auth.signOut();
  }
}
