import { Component } from "@angular/core";
import { IConfigFile } from '../sets-service/sets.service';
import { FilesService } from '../files-service/files.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatBottomSheet } from '@angular/material';
import { CreateFileFormComponent } from './add-file-form/create-file-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
  private readonly _loadingSbject = new BehaviorSubject<boolean>(true);
  private readonly _filesSubject = new BehaviorSubject<IConfigFile<string>[]>([]);

  loading$: Observable<boolean>;
  icons = { faPlus, faTimes };
  files$: Observable<IConfigFile<string>[]>;

  constructor(
    private _filesService: FilesService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.loading$ = this._loadingSbject.asObservable();
    this.files$ = this._filesSubject.asObservable();
    _filesService.getFiles$().subscribe(
      e => {
        this._loadingSbject.next(false);
        this._filesSubject.next(e);
      },
      err => {
        console.log('Ощибочка хэз акьюред');
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
          data: '[]'
        })
          .subscribe(e => {
            if (e == null) { return; }
            this._filesSubject.value.push(e);
            this._filesSubject.next(this._filesSubject.value);
          })
      })

  }
}