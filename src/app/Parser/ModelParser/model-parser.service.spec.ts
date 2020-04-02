import { ModelParserService } from './model-parser.service';

describe('ModelParserService', () => {
  let target: ModelParserService;
  let testPlainObject;
  let testModel;
  let testUnindexedModel;

  beforeEach(() => {

    testUnindexedModel = [
      { key: 'version', value: 3.1 },
      {
        key: 'services',
        value: [
          {
            key: 'redis',
            value: [
              { id: '_1_0_0', key: 'foo', value: 123 }
            ]
          },
          {
            key: 'mongo',
            value: [
              {
                key: 'foo',
                value: [
                  {
                    value: '123'
                  },
                  {
                    value: [
                      {
                        key: 'zoo',
                        value: [
                          {
                            key: 'too',
                            value: [
                              { value: 'loo' }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    ];

    testModel = [
      { id: '_0', key: 'version', value: 3.1 },
      {
        id: '_1',
        key: 'services',
        value: [
          {
            id: '_1_0',
            key: 'redis',
            value: [
              { id: '_1_0_0', key: 'foo', value: 123 }
            ]
          },
          {
            id: '_1_1',
            key: 'mongo',
            value: [
              {
                id: '_1_1_0',
                key: 'foo',
                value: [
                  {
                    id: '_1_1_0_0',
                    value: '123'
                  },
                  {
                    id: '_1_1_0_1',
                    value: [
                      {
                        id: '_1_1_0_1_0',
                        key: 'zoo',
                        value: [
                          {
                            id: '_1_1_0_1_0_0',
                            key: 'too',
                            value: [
                              { id: '_1_1_0_1_0_0_0', value: 'loo' }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    ];

    target = new ModelParserService();

  });

  it('should create', () => {
    expect(target).toBeTruthy();
  });

  describe('index', () => {
    it('should set correct id to every node of model', () => {
      target.index(testUnindexedModel[1], '_1');
      expect(testUnindexedModel[1]).toEqual(testModel[1]);
    });
  });

});
