import { Component } from '@angular/core';
import Chart from 'chart.js/auto'; // Use 'chart.js/auto' for the latest version
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent {
    // Your data
    data: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
      console.log(this.data);
      const levelMapping = {
        "niveau 1": 1,
        "niveau 2": 2,
        "niveau 3": 3,
        "niveau 4": 4,
        // Add more levels as needed
      };
  
      // Convert data to arrays for Chart.js
       const dates = Object.values(this.data).map(entry => entry.date);
      const levels = Object.values(this.data).map(entry => levelMapping[entry.level]);
  
  
  
      // Create a chart
       const ctx = document.getElementById('myChart') as HTMLCanvasElement;
       const colors = levels.map(level => {
        // Assign a color based on the numeric value
        switch (level) {
          case 1:
            return '#bf212f';
          case 2:
            return '#f9a73e';
          case 3:
            return '#006f3c';
          case 4:
            return '#264b96';
          default:
            return 'black';
        }
      });
       const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: 'Levels',
            data: levels,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            backgroundColor:colors
            //pointBackgroundColor: colors,
            //fill: false
          }]
        },
        options: {
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10
            }
          },
          responsive: true, // Enable responsiveness
          maintainAspectRatio: false // Allow chart to adjust size
        }
      });
    
    });

  } 
     
    
  }

