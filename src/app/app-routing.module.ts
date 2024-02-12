import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarrelBarComponent } from './barrel-bar/barrel-bar.component';
import { HistoriqueComponent } from './historique/historique.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path:"home",component:BarrelBarComponent},
  {path:"historic",component:HistoriqueComponent},
  {path:"about",component:AboutComponent},

  { path: '**', redirectTo: 'home' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
