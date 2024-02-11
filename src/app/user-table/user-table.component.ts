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
    let id = userModel.id;

    this.userService.deleteUser(userModel.id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== id)
      }
    );

    event.stopPropagation();
  }

  onNewClick() {
    this.router.navigate(['userForm-new']);
  }

  onSearchClick(value: string) {
    this.userService.searchUsers(value).subscribe(users => {
      this.users = users;
    });
  }

  onClearClick() {
    this.getUsers();
    this.tableSearchText = '';
  }

  onRowClick(userModel: UserModel) {

  }
}
