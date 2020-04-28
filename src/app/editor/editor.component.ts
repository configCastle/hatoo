import { Component, HostListener } from '@angular/core';
import { EditorService } from './editor.service';
import { Observable, observable, BehaviorSubject } from 'rxjs';
import { map, tap, take, skip, debounceTime, sampleTime, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IConfigFile, IKeyValue } from '../sets-service/sets.service';
import { faCloudUploadAlt, faCheckCircle, faCloud } from '@fortawesome/free-solid-svg-icons';

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
  private readonly _loadingSbject = new BehaviorSubject<boolean>(true);
  private readonly _savedSubject = new BehaviorSubject<boolean>(true);
  icons = {
    faCloudUploadAlt,
    faCloud,
    faCheckCircle
  }
  autosave = true;
  loading$: Observable<boolean>;
  textEditorWidth: number;
  file$: Observable<IConfigFile<IKeyValue<string>[]>>;
  saved$: Observable<boolean>;

  constructor(
    private _editorService: EditorService,
    _activatedRoute: ActivatedRoute
  ) {
    this.textEditorWidth = window.innerWidth * 0.4 - 10;

    this.loading$ = this._loadingSbject.asObservable();
    this.saved$ = this._savedSubject.asObservable();

    const fileId = +_activatedRoute.snapshot.params.file;
    this.file$ = _editorService.file$
      .pipe(
        tap(() => this._loadingSbject.next(false))
      );
    _editorService.selectFile(fileId);

    this.file$.pipe(
      skip(1),
      tap(() => this._savedSubject.next(false)),
      filter(e => this.autosave),
      sampleTime(1000)
    ).subscribe(e => {
      _editorService.saveFileData(e)
        .subscribe(e => {
          console.log('Saved');
          this._savedSubject.next(true);
        });
    });
  }

  save(event: MouseEvent) {
    event.preventDefault();
    this.file$.pipe(
      take(1),
      switchMap(e => this._editorService.saveFileData(e))
    ).subscribe(e => {
      console.log('Saved');
      this._savedSubject.next(true);
    });
  }

}
