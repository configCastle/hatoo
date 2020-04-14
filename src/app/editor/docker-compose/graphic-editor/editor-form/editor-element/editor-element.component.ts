import { Component, Input, OnDestroy } from '@angular/core';
import { IChangeList, ChangeType } from '../editor-form.component';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { GraphicEditorService } from 'src/app/editor/graphic-editor.service';
import { ServicesService } from '../../../services.service';
import { MatBottomSheet } from '@angular/material';
import { ServicesSelectSheetComponent } from '../../../services-select-sheet/services-select-sheet.component';

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

  constructor(
    private _graphicEditorService: GraphicEditorService,
    private _servicesService: ServicesService,
    private _bottomSheet: MatBottomSheet
  ) { }

  isArray(): boolean {
    return Array.isArray(this.form.value);
  }

  changeKey(value: string) {
    this._graphicEditorService.changeFileData({
      id: this.form.id,
      data: { key: value },
      type: ChangeType.UPDATE
    });
  }

  changeValue(value: any) {
    this._graphicEditorService.changeFileData({
      id: this.form.id,
      data: { value },
      type: ChangeType.UPDATE
    });
  }

  breakLeft() {
    const changedElement = {
      ...this.form,
      key: undefined,
      value: this.form.key.value
    }
    this._graphicEditorService.changeFileData({
      id: this.form.id,
      type: ChangeType.CHANGE_STRUCT,
      data: changedElement
    })
  }

  breakRight() {
    const changedElement = {
      ...this.form,
      key: this.form.value.value,
      value: 'value'
    }
    this._graphicEditorService.changeFileData({
      id: this.form.id,
      type: ChangeType.CHANGE_STRUCT,
      data: changedElement
    })
  }

  breakDown() {
    const newId = `${this.form.id}_0`;
    const changedElement = {
      ...this.form,
      key: this.form.key ? this.form.key.value : this.form.value.value,
      value: [{
        id: newId,
        value: 'value'
      }]
    }
    this._graphicEditorService.changeFileData({
      id: this.form.id,
      type: ChangeType.CHANGE_STRUCT,
      data: changedElement
    })
  }

  addService() {
    this._servicesService.getServices$().subscribe(e => {
      this._bottomSheet.open(ServicesSelectSheetComponent, {
        data: e
      })
        .afterDismissed()
        .subscribe(e => {
          if (e == null) { return; }
          this._servicesService.getServiceById$(e)
            .subscribe(e => {
              if (e == null) { return; }
              this.add(JSON.parse(e.data as string))
            })
        })
    })
  }

  add(data?: IKeyValue<string>) {
    this._graphicEditorService.changeFileData({
      id: this.form.id,
      type: ChangeType.ADD,
      data
    });
  }

  remove() {
    this._graphicEditorService.changeFileData({
      id: this.form.id,
      type: ChangeType.REMOVE
    });
  }

  ngOnDestroy() {
    this._stopSubject.next();
  }

}
