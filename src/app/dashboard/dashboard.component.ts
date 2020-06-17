import { Component } from "@angular/core";
import { IConfigFile } from '../sets-service/sets.service';
import { FilesService } from '../files-service/files.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { faPlus, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { CreateFileFormComponent } from './add-file-form/create-file-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
  private readonly _loadingSbject = new BehaviorSubject<boolean>(true);
  private readonly _filesSubject = new BehaviorSubject<IConfigFile<string>[]>([]);

  loading$: Observable<boolean>;
  icons = { faPlus, faTimes, faUser };
  files$: Observable<IConfigFile<string>[]>;
  userName: string;

  constructor(
    private _authService: AuthService,
    private _filesService: FilesService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.userName = _authService.user.login;
    this.loading$ = this._loadingSbject.asObservable();
    this.files$ = this._filesSubject.asObservable();
    _filesService.getFilesByUser$(this._authService.user.id).subscribe(
      e => {
        this._snackBar.open('Список файлов обновлён', null, { duration: 2000 });
        this._loadingSbject.next(false);
        this._filesSubject.next(e);
      },
      () => {
        this._snackBar.open('Не удалось загрузить файлы', null, { duration: 2000 });
        this._loadingSbject.next(false);
      }
    );
  }

  createFile() {
    this._bottomSheet.open(CreateFileFormComponent)
      .afterDismissed()
      .subscribe(e => {
        if (e == null) { return; }
        this._filesService.createFile$({
          name: e,
          configType: 'DOCKER_COMPOSE',
          data: '[]',
          user: this._authService.user.id
        })
          .subscribe(
            e => {
              if (e == null) {
                this._snackBar.open('Не удалось создать файл', null, { duration: 2000 });
              } else {
                this._router.navigate(['/', e.id])
              }
            },
            () => {
              this._snackBar.open('Не удалось создать файл', null, { duration: 2000 });
            }
          )
      })
  }

  logOut() {
    this._authService.signOut();
  }
}