import { ISet } from './sets.service';

export const testSets: ISet[] = [
  {
    name: 'abra kadabra',
    create: new Date(),
    update: new Date(),
    config_files: [
      {
        name: 'string',
        global: {
          version: '3'
        },
        services: [
          {
            name: 'redis',
            data: {
              image: 'redis:latest'
            }
          },
          {
            name: 'front',
            data: {
              build: '.'
            }
          }
        ]
      }
    ]
  }
];
