import { IKeyValue } from '../../sets-service/sets.service';

export const testYaml = `
version: 3.1
services:
  redis:
    foo: bar:buzz
    john_dou:
      - j
      - o
      - h
      - n`;

const testModel: IKeyValue<string>[] = [
  { key: 'version', value: 3.1 },
  {
    key: 'services',
    value: [
      {
        key: 'redis',
        value: [
          { key: 'foo', value: 'bar:buzz' },
          {
            key: 'john_dou',
            value: [
              { value: 'j' },
              { value: 'o' },
              { value: 'h' },
              { value: 'n' }
            ]
          }
        ]
      }
    ]
  }
];
