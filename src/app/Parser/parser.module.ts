import { NgModule } from '@angular/core';
import { YAMLParserService } from './YAMLParser/yaml-parser.service';
import { ModelParserService } from './ModelParser/model-parser.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    YAMLParserService,
    ModelParserService
  ]
})
export class ParserModule { }
