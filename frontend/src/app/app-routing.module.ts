import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {EditorComponent} from "./editor/editor.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'editor/:tempId',
    component:EditorComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
