import { ISet, IKeyValue } from './sets.service';
import { ModelParserService } from '../Parser/ModelParser/model-parser.service';

export const testSets: ISet<IKeyValue<string>[]>[] = [
  {
    id: 0,
    name: 'abra kadabra',
    create: new Date(),
    update: new Date(),
    config_files: [
      {
        id: 0,
        configType: 1,
        name: 'some name',
        user: 0,
        data: new ModelParserService().plainObjectToModel({
          version: 3,
          services: {
            redis: {
              build: '.',
              port: 8080
            },
            mongo: {
              user: ['l', 'o', 'l'],
              password: 'kek'
            }
          }
        })
      }
    ]
  }
];
