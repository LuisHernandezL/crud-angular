import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  users: any[] = [];

  constructor(
    private _userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe((data) => {
      this.users = [];
      data.forEach((element: any) => {
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.users);
    });
  }

  eliminarUser(id: string) {
    this._userService
      .eliminarUser(id)
      .then(() => {
        console.log('empleado eliminado con exito');
        this.toastr.error(
          'El usuario se elimino con exito',
          'Registro eliminado!',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      })
      .catch((err) => console.log(err));
  }
}
