import { Component, HostListener } from '@angular/core';
import { EditorService } from './editor.service';
import { Observable, observable, BehaviorSubject } from 'rxjs';
import { map, tap, take, skip, debounceTime, sampleTime, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { IConfigFile, IKeyValue } from '../sets-service/sets.service';
import { faCloudUploadAlt, faCheckCircle, faCloud, faSave, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { DeleteFileConfirmComponent } from './delete-confirm/delete-file-confirm.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.scss']
})
export class EditorComponent {
  @HostListener('window:resize')
  onResize() {
    this.textEditorWidth = window.innerWidth * 0.4 - 10;
  }
  freeMode = false;
  private readonly _loadingSbject = new BehaviorSubject<boolean>(true);
  private readonly _savedSubject = new BehaviorSubject<boolean>(true);
  icons = {
    faCloudUploadAlt,
    faCloud,
    faCheckCircle,
    faSave,
    faDownload,
    faTrashAlt
  }
  autosave = true;
  loading$: Observable<boolean>;
  textEditorWidth: number;
  file$: Observable<IConfigFile<IKeyValue<string>[]>>;
  saved$: Observable<boolean>;

  constructor(
    private _editorService: EditorService,
    _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _bottomSheetService: MatBottomSheet
  ) {
    this.loading$ = this._loadingSbject.asObservable();
    this.saved$ = this._savedSubject.asObservable();
    this.file$ = _editorService.file$;

    this.textEditorWidth = window.innerWidth * 0.4 - 10;
    const fileId = +_activatedRoute.snapshot.params.file;
    if (fileId) {
      _editorService.selectFile(fileId);
    } else {
      this.freeMode = true;
      _editorService.selectFile(-1);
    }

    this.file$.pipe(
      tap(() => { this._loadingSbject.next(false); }),
      skip(1),
      tap(() => { this._savedSubject.next(false); }),
      filter(() => this.autosave && !this.freeMode),
      sampleTime(1000)
    ).subscribe(
      e => {
        _editorService.saveFileData$(e)
          .subscribe(e => {
            this._savedSubject.next(true);
          });
      },
      err => {
        this._snackBar.open('Не удалось автоматически сохранить изменения', null, { duration: 2000 });
        this._loadingSbject.next(false)
      }
    );
  }

  downloadFile(event: MouseEvent) {
    event.preventDefault();
    this.file$.pipe(take(1)).subscribe(e => {
      this._editorService.downloadFile(e);
    });
  }

  save(event: MouseEvent) {
    event.preventDefault();
    if (this.freeMode) { return; }
    this.file$.pipe(
      take(1),
      switchMap(e => this._editorService.saveFileData$(e))
    ).subscribe(
      e => {
        this._snackBar.open('Изменения сохранены', null, { duration: 2000 });
        this._savedSubject.next(true);
      },
      err => {
        this._snackBar.open('Не удалось сохранить изменения', null, { duration: 2000 });
        this._savedSubject.next(false);
      }
    );
  }

  removeFile(event: MouseEvent) {
    event.preventDefault();
    if (this.freeMode) { return; }
    this.file$.pipe(
      take(1),
      switchMap(file => {
        return this._bottomSheetService.open(DeleteFileConfirmComponent)
          .afterDismissed()
          .pipe(
            switchMap(e => {
              if (e) {
                console.log(file.id);
                return this._editorService.removeFile$(file.id);
              }
              return of(undefined);
            })
          )
      })
    ).subscribe(
      e => {
        if (e) {
          this._snackBar.open('Файл удалён', null, { duration: 2000 });
          this._router.navigate(['/dashboard']);
        }
      },
      err => {
        this._snackBar.open('Не удалось удалить файл', null, { duration: 2000 });
      }
    );
  }

}
