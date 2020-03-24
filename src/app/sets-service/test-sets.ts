import { ISet } from './sets.service';

export const testSets: ISet<any>[] = [
  {
    id: 0,
    name: 'abra kadabra',
    create: new Date(),
    update: new Date(),
    config_files: [
      {
        id: 0,
        type: 1,
        name: 'some name',
        data: [
          {
            _id: '0',
            key: 'version',
            value: 3,
            required: true
          },
          {
            _id: '1',
            key: 'services',
            value: [
              {
                _id: '10',
                key: 'redis',
                value: [
                  {
                    _id: '100',
                    key: 'build',
                    value: '.'
                  },
                  {
                    _id: '101',
                    key: 'port',
                    value: 8080
                  }
                ]
              },
              {
                _id: '11',
                key: 'mongo',
                value: [
                  {
                    _id: '110',
                    key: 'user',
                    value: [
                      { _id: '1100', value: 'l' },
                      { _id: '1001', value: 'o' },
                      { _id: '1002', value: 'l' },
                    ]
                  },
                  {
                    _id: '111',
                    key: 'pass',
                    value: 'kek'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
