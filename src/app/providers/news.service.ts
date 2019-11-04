import { Injectable, Output, EventEmitter } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface News {
  category: string,
  content: string,
  img: string,
  subtitle: string,
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private itemsCollection: AngularFirestoreCollection<News>;
  private oDocument: AngularFirestoreDocument<News>;
  public news: any;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(public db: AngularFirestore) {
    this.itemsCollection = db.collection<News>('news');
  }

  onLoadNews() {
    let data = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as News
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return data;
  }
  onSaveNew(data: any, successCallback, errorCallback) {
    this.itemsCollection.add(data).then(function () {
      successCallback()
    }).catch(function (error) {
      errorCallback()
    });;
  }
  onDeleteNews(id: string, successCallback, errorCallback) {
    this.itemsCollection.doc(id).delete().then(function () {
      successCallback()
    }).catch(function (error) {
      errorCallback()
    });
  }
  onFilterNews(category:string) {
    let data = this.db.collection<News>('news', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('category', '==', category);
      return query;
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as News
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.news = data;
    this.change.emit(this.news);
  }
}
