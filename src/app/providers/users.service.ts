import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';


export interface Users {
  name: string;
  lastname: string;
  email: string;
  password: string;
  rol: string;
  image_profile: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private itemsCollection: AngularFirestoreCollection<Users>;

  constructor(
    public _AuthService: AuthenticationService,
    private router: Router,
    private db: AngularFirestore
  ) {
    this.itemsCollection = db.collection<Users>('users');
  }
  onLoadUsers() {
    let data = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return data;

  }
  onSaveUser(data: Users,successCallback, errorCallback) {
    this._AuthService.onSaveUser(data,
      (dataUser) => {
        let id = dataUser.user.uid;
        delete data.password;
        this.itemsCollection.doc(id).set(data).then(function () {
          successCallback()
        }).catch(function (error) {
          console.log(error)

          errorCallback(error)
        })
      },
      (error) => {
        errorCallback(error)
      });

  }
}
