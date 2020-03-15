import { ISet, FileTypes } from './sets.service';

export const testSets: ISet<any>[] = [
  {
    id: 0,
    name: 'abra kadabra',
    create: new Date(),
    update: new Date(),
    config_files: [
      {
        id: 0,
        type: FileTypes.DOCKER_COMPOSE,
        name: 'some name',
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
              build: '.',
              array: [
                'fuck',
                'this',
                'shit',
                '!'
              ]
            }
          }
        ]
      }
    ]
  }
];
