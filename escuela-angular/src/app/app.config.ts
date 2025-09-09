import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "escuela-portafolio", appId: "1:52507293005:web:d0a248991ca7a6eb66b304", storageBucket: "escuela-portafolio.firebasestorage.app", apiKey: "AIzaSyA9GZvARSsVwd_lDsu9mT9jf9eSsc6NZ6M", authDomain: "escuela-portafolio.firebaseapp.com", messagingSenderId: "52507293005", measurementId: "G-E2MRH0L39B" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
