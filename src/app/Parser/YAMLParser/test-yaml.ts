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
  { id: '0', key: 'version', value: 3.1 },
  {
    id: '1',
    key: 'services',
    value: [
      {
        id: '10',
        key: 'redis',
        value: [
          { id: '100', key: 'foo', value: 'bar:buzz' },
          {
            key: 'john_dou',
            value: [
              { id: '1000', value: 'j' },
              { id: '1001', value: 'o' },
              { id: '1002', value: 'h' },
              { id: '1003', value: 'n' }
            ]
          }
        ]
      }
    ]
  }
];
