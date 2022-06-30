import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  agregarUser(user: any): Promise<any> {
    return this.firestore.collection('persona').add(user);
  }

  getUsers(): Observable<any> {
    return this.firestore
      .collection('persona', (ref) => ref.orderBy('fechaCreacion', 'asc'))
      .snapshotChanges();
  }

  eliminarUser(id: string): Promise<any> {
    return this.firestore.collection('persona').doc(id).delete();
  }

  getUser(id: string): Observable<any> {
    return this.firestore.collection('persona').doc(id).snapshotChanges();
  }

  actualizarUser(id: string, data: any): Promise<any> {
    return this.firestore.collection('persona').doc(id).update(data);
  }
}
