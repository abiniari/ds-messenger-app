import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { USE_EMULATOR as AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as DATABASE_EMULATOR } from '@angular/fire/compat/database';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { connectDatabaseEmulator, getDatabase, provideDatabase } from '@angular/fire/database';
import { Firestore, FirestoreModule, connectFirestoreEmulator, getFirestore, initializeFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationService } from './core/authorization.service';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FirestoreModule,
    BrowserAnimationsModule,
    LoginModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      }
      return auth;
    }),
    provideDatabase(() => {
      const db = getDatabase()
      if (environment.useEmulators) {
        connectDatabaseEmulator(db, 'localhost', 9000);
      }
      return db;
    }),
    provideFirestore(() => {
      let fireStore: Firestore;
      if (environment.useEmulators) {
        fireStore = initializeFirestore(getApp(), {});
        connectFirestoreEmulator(fireStore, 'localhost', 8080);
      }
      else {
        fireStore = getFirestore();
      }
      return fireStore;
    }),


  ],
  providers: [
    AuthorizationService,
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebase
    },
    {
      provide: AUTH_EMULATOR,
      useValue: environment.useEmulators ? ['http://localhost:9099', 9099] : undefined
    },
    {
      provide: DATABASE_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 9000],
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 8080] : undefined
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
