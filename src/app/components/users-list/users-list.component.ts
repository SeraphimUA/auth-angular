import { Component, OnInit } from '@angular/core';

export interface UserModel {
  userId: number,
  login: string,
  username: string,
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
