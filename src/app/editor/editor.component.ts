import { Component, HostListener } from '@angular/core';
import { EditorService } from './editor.service';
import { Observable, observable, BehaviorSubject } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IConfigFile, IKeyValue } from '../sets-service/sets.service';

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
  loading$: Observable<boolean>;
  textEditorWidth: number;
  file$: Observable<IConfigFile<IKeyValue<string>[]>>;

  constructor(
    _editorService: EditorService,
    _activatedRoute: ActivatedRoute
  ) {
    this.loading$ = this._loadingSbject.asObservable();
    const fileId = +_activatedRoute.snapshot.params.file;
    this.textEditorWidth = window.innerWidth * 0.4 - 10;
    this.file$ = _editorService.file$
      .pipe(
        tap(() => this._loadingSbject.next(false))
      );
    _editorService.selectFile(fileId);
    this.file$.pipe(take(1)).subscribe()
  }

}
