import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarrelBarComponent } from './barrel-bar/barrel-bar.component';
import { HistoriqueComponent } from './historique/historique.component';

const routes: Routes = [
  {path:"home",component:BarrelBarComponent},
  {path:"historic",component:HistoriqueComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
