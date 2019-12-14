import { Injectable } from '@angular/core';
import { SetsService, ISet, IConfigFile } from 'src/app/sets-service/sets.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { YAMLParserService } from 'src/app/Parser/yaml-parser.service';
import { FormGroupParserService } from 'src/app/Parser/FormGroupParser/form-group-parser.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  plain$: Observable<ISet>;
  asFormGroup$: Observable<IConfigFile<FormGroup>[]>;
  asYamlString$: Observable<string[]>;
  constructor(
    _yamlParser: YAMLParserService,
    _formParser: FormGroupParserService,
    _setsService: SetsService,
    _route: ActivatedRoute
  ) {
    const id = _route.snapshot.params.id;
    this.plain$ = _setsService.getById$(id);
    this.asFormGroup$ = this.plain$.pipe(
      map((set: ISet) => {
        return set.config_files.map(f => ({
          name: f.name,
          global: _formParser.objectToFormGroup(f.global),
          services: f.services.map(s => _formParser.objectToFormGroup(s))
        }))
      })
    );
    this.asYamlString$ = this.plain$.pipe(
      map((set: ISet) => {
        return set.config_files.map(f => {
          return _yamlParser.objectToYAML({ ...f.global, services: f.services })
        })
      })
    );
  }
}
