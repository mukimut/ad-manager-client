import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdProjectsComponent } from './ad-projects/ad-projects.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'adprojects', component: AdProjectsComponent},
  {path: '', component: HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
