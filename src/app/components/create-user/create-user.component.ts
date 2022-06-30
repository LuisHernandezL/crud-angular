import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  createUser: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar usuario';

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createUser = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      edad: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.edit();
  }
  agregarEditUser() {
    this.submitted = true;
    if (this.createUser.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarUser();
    } else {
      this.editUser(this.id);
    }
  }

  agregarUser() {
    const user: any = {
      nombre: this.createUser.value.nombre,
      apellido: this.createUser.value.apellido,
      documento: this.createUser.value.documento,
      edad: this.createUser.value.edad,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._userService
      .agregarUser(user)
      .then(() => {
        this.toastr.success(
          'El usuario se registro con exito!',
          'Empleado registrado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.loading = false;
        this.router.navigate(['/list-user']);
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  editUser(id: string) {
    const user: any = {
      nombre: this.createUser.value.nombre,
      apellido: this.createUser.value.apellido,
      documento: this.createUser.value.documento,
      edad: this.createUser.value.edad,
      fechaActualizacion: new Date(),
    };

    this.loading = true;

    this._userService.actualizarUser(id, user).then(() => {
      this.loading = false;
      this.toastr.info('El usuario fue editado con exito', 'Usuario editado', {
        positionClass: 'toast-bottom-right',
      });
      this.router.navigate(['/list-user']);
    });
  }

  edit() {
    this.titulo = 'Editar usuario';
    if (this.id !== null) {
      this.loading = true;
      this._userService.getUser(this.id).subscribe((data) => {
        this.loading = false;

        this.createUser.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          edad: data.payload.data()['edad'],
          documento: data.payload.data()['documento'],
        });
      });
    }
  }
}
