import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  isNew: boolean = false;
  userForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, public formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      id: 0,
      name: '',
      age: 0,
      weight: 0.0
    });
  }

  ngOnInit() {
    this.isNew = true;

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isNew = false;

        this.userService.getUserById(params['id']).subscribe(user => {
          this.userForm.setValue({
            id: user.id,
            name: user.name,
            age: user.age,
            weight: user.weight
          })
        });
      }
    })
  }

  onSubmit() {
    if (this.isNew) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (user) => console.log(user),
        error: (error) => console.error(error),
        complete: () => console.info('complete')
      });

      this.backToTable();
    }
    else {
      this.userService.updateUser(this.userForm.value).subscribe({
        next: (user) => console.log(user),
        error: (error) => console.error(error),
        complete: () => console.info('complete')
      });

      this.backToTable();
    }
  }

  backToTable() {
    this.router.navigate(['users']);
  }
}
