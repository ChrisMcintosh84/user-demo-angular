import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserTableComponent} from "./user-table/user-table.component";
import {UserFormComponent} from "./user-form/user-form.component";

const routes: Routes = [
  { path: 'users', component: UserTableComponent },
  { path: 'userForm-new', component: UserFormComponent },
  { path: 'userForm-update/:id', component: UserFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
