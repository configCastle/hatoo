import { DCFormParserService } from './dc-form-parser.service';
import { InputTypes } from 'src/app/sets-service/sets.service';
import { FormControl } from '@angular/forms';

describe('DCFormParserService', () => {
  let target: DCFormParserService;
  let testModel;
  let testForm;

  beforeEach(() => {
    testModel = [
      {
        key: 'version',
        value: 3
      },
      {
        key: 'services',
        required: true,
        type: InputTypes.SELECT,
        value: [
          {
            key: 'redis',
            value: 'redis-description'
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
              }
            ]
          }
        ]
      }
    ];
    testForm = [
      {
        key: new FormControl('version'),
        value: new FormControl(3),
        required: true
      },
      {
        key: new FormControl('services'),
        type: InputTypes.SELECT,
        value: [
          {
            key: new FormControl('redis'),
            value: new FormControl('redis-description')
          },
          {
            key: new FormControl('mongo'),
            value: [
              {
                key: new FormControl('user'),
                value: [
                  { value: new FormControl('l') },
                  { value: new FormControl('o') },
                  { value: new FormControl('l') },
                ]
              }
            ]
          }
        ]
      }
    ];
    target = new DCFormParserService();
  });

  it('should create', () => {
    expect(target).toBeTruthy();
  });

  describe('modelToFormGroup method', () => {
    xit('should return model of AbstractControls', () => {
      console.log(target.modelToFormGroup(testModel));
    });
  });

  describe('formGroupToModel method', () => {
    xit('should return model of string', () => {
      expect(target.formGroupToModel(testForm)).toEqual(testModel);
    });
  });

});
