import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IChangeList, ChangeType } from '../editor-form.component';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editor-element',
  templateUrl: 'editor-element.component.html',
  styleUrls: ['editor-element.component.scss']
})
export class EditorElementComponent implements OnDestroy {

  private _stopSubject = new Subject<void>();
  private _form: any;
  @Input()
  set form(value: any) {
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
  get form() {
    return this._form;
  }

  @Output() changed = new EventEmitter<IChangeList>();

  isArray() {
    return Array.isArray(this.form.value);
  }

  changeKey(value: any) {
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

  ngOnDestroy() {
    this._stopSubject.next();
  }

}
