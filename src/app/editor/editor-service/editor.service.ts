import { Injectable } from '@angular/core';
import { SetsService, ISet, IConfigFile } from 'src/app/sets-service/sets.service';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms'
import { YAMLParserService } from 'src/app/Parser/yaml-parser.service';
import { FormGroupParserService } from 'src/app/Parser/FormGroupParser/form-group-parser.service';
import { Form } from 'src/app/Parser/FormGroupParser/form-group-parser.service';


@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _selectedIndexSubject = new BehaviorSubject<number>(0);
  private _setSubject: BehaviorSubject<ISet<any>>;
  private _asFormGroup$: Observable<ISet<Form>>;
  private _asYamlString$: Observable<ISet<string>>;

  set$: Observable<ISet<any>>;
  selectedFileAsForm$: Observable<IConfigFile<Form>>;
  selectedFileAsString$: Observable<IConfigFile<string>>;
  
  constructor(
    private _yamlParser: YAMLParserService,
    private _formParser: FormGroupParserService,
    _setsService: SetsService,
    _route: ActivatedRoute
  ) {
    this._setSubject = new BehaviorSubject<ISet<any>>(
      _setsService.getById$(_route.snapshot.params.id)
    );
    this.set$ = this._setSubject.asObservable();
    this._asFormGroup$ = this._setSubject.pipe(
      map((set: ISet<Form>) => {
        return {
          name: set.name,
          create: set.create,
          update: set.update,
          config_files: set.config_files.map(f => ({
            name: f.name,
            global: _formParser.objectToFormGroup(f.global),
            services: _formParser.objectToFormGroup(f.services)
          }))
        }
      })
    );
    this._asYamlString$ = this._setSubject.pipe(
      map((set: ISet<any>) => {
        return {
          name: set.name,
          create: set.create,
          update: set.update,
          config_files: set.config_files.map(f => {
            return {
              name: f.name,
              global: _yamlParser.objectToYAML(f.global),
              services: [_yamlParser.objectToYAML({ services: f.services })]
            }
          })
        }  
      })
    );

    this.selectedFileAsForm$ = combineLatest(
      this._selectedIndexSubject,
      this._asFormGroup$
    ).pipe(
      map(([i, set]) => set.config_files[i])
    );

    this.selectedFileAsString$ = combineLatest(
      this._selectedIndexSubject,
      this._asYamlString$
    ).pipe(
      map(([i, set]) => set.config_files[i])
    );
  }

  updateFile(file: IConfigFile<any>) {
    console.log('In editor service: ', file);
    const selectedIndex = this._selectedIndexSubject.value;
    const newSet = this._setSubject.value;
    newSet.config_files[selectedIndex] = file;
    this._setSubject.next(newSet);
  }

  setWithString(file: IConfigFile<string>) {
    this.updateFile({
      name: file.name,
      global: this._yamlParser.parse(file.global),
      services: [this._yamlParser.parse(file.services[0])]
    });
  }

  // setWithForm(file: IConfigFile<Form>) { 
  //   this.updateFile({
  //     name: file.name,
  //     global: this._formParser.parse(file.global),
  //     services: [this._formParser.parse(file.services as FormArray)]
  //   });
  // }

  selectFileIndex(index: number) {
    this._selectedIndexSubject.next(index);
  }
}
