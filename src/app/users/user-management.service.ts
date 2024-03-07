import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private fireDb:AngularFireDatabase) { }

  getUsers():Observable<User[]> {
    return this.fireDb.list('users').valueChanges() as Observable<User[]>
  }
}
