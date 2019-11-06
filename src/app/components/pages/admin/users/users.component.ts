import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsersService } from '../../../../providers/users.service';

declare var $;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],

})
export class UsersComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('datatable') table : ElementRef;
  dataTable : any;
  public users: any[];

  constructor(private userService: UsersService) { }

  public formUser = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname : new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  ngOnInit() {
    this.onLoadUsers();
  }
  onLoadUsers() {
    this.userService.onLoadUsers().subscribe(users => (this.users = users))
    this.renderDataTable();
  }

  onSaveUser() {
    let user = this.formUser.value;
    this.userService.onSaveUser(user, () => {
      this._onCloseModal();
      Swal.fire('Registro de Usuario!', 'Usuario creado exitosamente.', 'success');
    },
    () => {
      Swal.fire('Registro de Usuario!', 'El Usuario no ha sido creado.', 'error');
    })
  }

  renderDataTable(){
    setTimeout(() => {
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.dataTable();
    }, 1000)
  }
 
  _onCloseModal() {
    this.formUser.reset();
    let modal = $(this.modal.nativeElement);
    modal.modal('hide');
  }  
}
