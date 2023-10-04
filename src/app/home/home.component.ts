import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Data } from '../data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private trashRef: AngularFireList<Data>;

  constructor(private db: AngularFireDatabase) {
    this.trashRef = db.list<Data>("/data");
  }

  ngOnInit() {
    this.trashRef
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => c.payload.val())))
      .subscribe((data) => console.log(data));
  }
}
