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
  private ref: AngularFireList<Data>;
  data:Data[];
  current:Data;

  constructor(private db: AngularFireDatabase) {
    this.ref = db.list<Data>("/data");
  }

  ngOnInit() {
    this.ref
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => c.payload.val())))
      .subscribe((data:Data[]) =>
      {
      this.data=data;
      this.current=data[0];
  });
      
  }
}
