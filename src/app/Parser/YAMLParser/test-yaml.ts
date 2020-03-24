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
  { _id: '0', key: 'version', value: 3.1 },
  {
    _id: '1',
    key: 'services',
    value: [
      {
        _id: '10',
        key: 'redis',
        value: [
          { _id: '100', key: 'foo', value: 'bar:buzz' },
          {
            key: 'john_dou',
            value: [
              { _id: '1000', value: 'j' },
              { _id: '1001', value: 'o' },
              { _id: '1002', value: 'h' },
              { _id: '1003', value: 'n' }
            ]
          }
        ]
      }
    ]
  }
];
