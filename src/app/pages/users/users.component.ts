import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CardComponent } from '@components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_DURATION } from '@constants/snack-bar.constants';
import { User } from '@interfaces/users-response';
import { UserEditDialogComponent } from '@components/user-edit-dialog/user-edit-dialog.component';
import { UsersService } from '@services/users/users.service';

@Component({
  selector: 'app-pages-users',
  standalone: true,
  imports: [
    CardComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  public dialog = inject(MatDialog);
  public _matSnackBar = inject(MatSnackBar)
  private usersService: UsersService = inject(UsersService);
  public usersList: User[] = [];

  public userForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellidoMaterno: new FormControl(''),
    apellidoPaterno: new FormControl(''),
    tipo: new FormControl(''),
  })

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadUsers();
  }

  public loadUsers(): void {
    this.usersService.getUsers().subscribe((res: User[]) => {
      console.log(res);
      this.usersList = res;
    });
  }

  public deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe((res: string) => {
      console.log('Borrando usuario: ', res);
      this.loadUsers();
      this._matSnackBar.open("Usuario borrado correctamente.", "Cerrar", {
        duration: SNACKBAR_DURATION
      })
    });
  }

  public createUser(): void {
    const newUser: User = this.userForm.value;
    this.usersService.createUser( newUser ).subscribe(
      (res: any) => {
        this.loadUsers();
        this.userForm.reset();
        this._matSnackBar.open("Usuario creado correctamente.", "Cerrar", {
          duration: SNACKBAR_DURATION
        })
      }
    )
  }

  public openDialog( userData: User ): void {
    const editDialogRef = this.dialog.open(UserEditDialogComponent, {
      data: {
        ...userData
      },
      minWidth: '75%'
    });

    editDialogRef.afterClosed().subscribe(result => {
      this.loadUsers()
      this._matSnackBar.open("Usuario actualizado correctamente.", "Cerrar", {
        duration: SNACKBAR_DURATION
      })
    })
  }
}
