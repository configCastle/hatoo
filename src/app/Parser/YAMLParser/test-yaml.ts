import { IKeyValue } from '../../sets-service/sets.service';

export const testYaml = `
version: 3.1
services:
  redis:
    foo: bar:buzz
    john_dou:
      - j
      - o
      - key: value
      - key2:
          key3: value`;

