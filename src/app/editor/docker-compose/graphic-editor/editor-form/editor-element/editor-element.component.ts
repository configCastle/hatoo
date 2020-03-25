import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IChangeList, ChangeType } from '../editor-form.component';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IKeyValue } from 'src/app/sets-service/sets.service';

@Component({
  selector: 'app-editor-element',
  templateUrl: 'editor-element.component.html',
  styleUrls: ['editor-element.component.scss']
})
export class EditorElementComponent implements OnDestroy {

  private _stopSubject = new Subject<void>();
  private _form: IKeyValue<FormControl>;
  @Input()
  set form(value: IKeyValue<FormControl>) {
    if (this._form === value) { return; }
    this._form = value;
    this._stopSubject.next();
    if (this._form.key && this._form.key instanceof FormControl) {
      this._form.key.valueChanges
        .pipe(takeUntil(this._stopSubject))
        .subscribe(k => this.changeKey(k));
    }
    if (this._form.value && this._form.value instanceof FormControl) {
      this._form.value.valueChanges
        .pipe(takeUntil(this._stopSubject))
        .subscribe(v => this.changeValue(v));
    }
  }
  get form(): IKeyValue<FormControl> {
    return this._form;
  }

  @Output() changed = new EventEmitter<IChangeList>();

  isArray(): boolean {
    return Array.isArray(this.form.value);
  }

  changeKey(value: string) {
    this.changed.emit({
      id: this.form.id,
      newValues: { key: value },
      type: ChangeType.UPDATE
    });
  }

  changeValue(value: any) {
    this.changed.emit({
      id: this.form.id,
      newValues: { value },
      type: ChangeType.UPDATE
    });
  }

  changeIndentedElement(value: IChangeList) {
    this.changed.emit({
      id: this.form.id,
      subtree: value,
      type: value.type
    });
  }

  add() {
    if (!this.isArray()) { return; }
    this.changed.emit({
      id: this.form.id,
      type: ChangeType.ADD
    });
  }

  remove() {
    this.changed.emit({
      id: this.form.id,
      type: ChangeType.REMOVE
    });
  }

  ngOnDestroy() {
    this._stopSubject.next();
  }

}
