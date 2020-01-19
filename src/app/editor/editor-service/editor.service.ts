import { Injectable } from '@angular/core';
import { SetsService, ISet, IConfigFile } from 'src/app/sets-service/sets.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { YAMLParserService } from 'src/app/Parser/yaml-parser.service';
import { FormGroupParserService } from 'src/app/Parser/FormGroupParser/form-group-parser.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  plain$: Observable<ISet<any>>;
  asFormGroup$: Observable<ISet<FormGroup>>;
  asYamlString$: Observable<ISet<string>>;
  constructor(
    _yamlParser: YAMLParserService,
    _formParser: FormGroupParserService,
    _setsService: SetsService,
    _route: ActivatedRoute
  ) {
    this.plain$ = _setsService.getById$(_route.snapshot.params.id);
    this.asFormGroup$ = this.plain$.pipe(
      map((set: ISet<any>) => {
        return {
          name: set.name,
          create: set.create,
          update: set.update,
          config_files: set.config_files.map(f => ({
            name: f.name,
            global: _formParser.objectToFormGroup(f.global),
            services: new FormArray((f.services as any[]).map(s => _formParser.objectToFormGroup(s)))
          }))
        }
      })
    );
    this.asYamlString$ = this.plain$.pipe(
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
  }
}
