import {Component, OnInit} from '@angular/core';
import {UserModel} from "../_models/user-model";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  users: UserModel[] = [];
  tableSearchText = '';
  titleText = 'Users';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(userModel: UserModel, event: any) {
    this.router.navigate(['userForm-update', userModel.id])

    event.stopPropagation();
  }

  deleteUser(userModel: UserModel, event: any) {

  }

  onNewClick() {
    this.router.navigate(['userForm-new']);
  }

  onSearchClick() {

  }

  onClearClick() {

  }

  onRowClick(userModel: UserModel) {

  }
}
