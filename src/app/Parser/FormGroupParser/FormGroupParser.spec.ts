import { FormGroupParserService } from './form-group-parser.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

describe('FormGroupParserService', () => {
  let subject: FormGroupParserService;
  let testObject: any;
  let testFormGroup: FormGroup;

  beforeEach(() => {
    subject = new FormGroupParserService();
    testObject = {
      foo: {
        bar: 'buzz',
        array: [
          '111',
          '222',
          '333'
        ]
      },
      johnDou: 'lol'
    };
    testFormGroup = new FormGroup({
      foo: new FormGroup({
        bar: new FormControl('buzz'),
        array: new FormArray([
          new FormControl('111'),
          new FormControl('222'),
          new FormControl('333'),
        ])
      }),
      johnDou: new FormControl('lol')
    });
  });

  it('should create', () => {
    expect(subject).toBeTruthy();
  });

  describe('parse', () => {
    it('should return object from passed form group', () => {
      expect(subject.parse(testFormGroup)).toEqual(testObject);
    });
  });

  describe('objectToFormGroup', () => {
    it('should return form group from passed object', () => {
      expect(
        ((subject.objectToFormGroup(testObject) as FormGroup)
          .controls.foo as FormGroup)
          .controls.bar.value
      ).toBe('buzz');

      expect(
        (((subject.objectToFormGroup(testObject) as FormGroup)
          .controls.foo as FormGroup)
          .controls.array as FormArray)
          .controls[1].value
      ).toBe('222');

      expect(
        (subject.objectToFormGroup(testObject) as FormGroup)
          .controls.johnDou
          .value
      ).toBe('lol');
    });

    it('should warn if passed value is not an object', () => {
      const spy = spyOn(console, 'warn');
      subject.objectToFormGroup(1);
      expect(console.warn).toHaveBeenCalled();
      spy.calls.reset();
      subject.objectToFormGroup('foo');
      expect(console.warn).toHaveBeenCalled();
    });
  });

});
