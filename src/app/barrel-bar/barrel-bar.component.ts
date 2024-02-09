import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-barrel-bar',
  templateUrl: './barrel-bar.component.html',
  styleUrls: ['./barrel-bar.component.css']
})
export class BarrelBarComponent {
 level: number=2 ;
  date: string = '2024-02-12';
  data: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
      this.date=data.pop().date;
      this.level=parseInt(data.pop().level.split(' ')[1]);
      console.log(this.level);
    });
  } 

}
