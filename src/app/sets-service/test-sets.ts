import { ISet, InputTypes } from './sets.service';

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
            key: 'version',
            value: 3,
            required: true
          },
          {
            key: 'services',
            value: [
              {
                key: 'redis',
                value: [
                  {
                    key: 'build',
                    value: '.'
                  },
                  {
                    key: 'port',
                    value: 8080
                  }
                ]
              },
              {
                key: 'mongo',
                value: [
                  {
                    key: 'user',
                    value: [
                      { value: 'l' },
                      { value: 'o' },
                      { value: 'l' },
                    ]
                  },
                  {
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
