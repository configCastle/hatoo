import { EditorService } from "./editor.service";
import { of } from 'rxjs';
import { ISet } from 'src/app/sets-service/sets.service';
import { FormGroup, FormControl } from '@angular/forms';

describe('EditorService', () => {
   let target: EditorService;
   let yamlParserStub;
   let formParserStub;
   let setsServiceStub;
   let routeStub;
   let testSet: ISet<any>;
   
  beforeEach(() => {
    testSet  = {
      name: 'foo',
      create: new Date(),
      update: new Date(),
      config_files: [
        {
          name: 'first file',
          global: {
            version: '3'
          },
          services: [
            {
              name: 'redis',
              data: 'lol'
            }
          ]
        }
      ]
    }
    yamlParserStub = {
      objectToYAML() {}
    };
    formParserStub = {
      objectToFormGroup() {}
    };
    setsServiceStub = {
      getById$() {
        return of(testSet);
      }
    };
    routeStub = {
      snapshot: {
        params: {}
      }
    };

    target = new EditorService(
      yamlParserStub,
      formParserStub,
      setsServiceStub,
      routeStub
    );
  });

  it('should create', () => {
    expect(target).toBeTruthy();
  });

  describe('plain$', () => {
    it('should emit a Set received by id route param', (done: DoneFn) => {
      target.plain$.subscribe(e => {
        expect(e).toBe(testSet);
        done();
      })
    });
  });

  describe('asFormGroup$', () => {
    it('should emit a Set<FormGroup> from plain', (done: DoneFn) => {
      testSet.config_files = [];
      spyOn(setsServiceStub, 'getById$').and.returnValue(of(testSet));
      spyOn(formParserStub, 'objectToFormGroup').and.returnValue({});
      target = new EditorService(
        yamlParserStub,
        formParserStub,
        setsServiceStub,
        routeStub
      );
      target.asFormGroup$.subscribe(e => {
        expect(e.name).toBe(testSet.name);
        expect(e.create).toBe(testSet.create);
        expect(e.update).toBe(testSet.update);
        expect(e.config_files).toEqual([]);
        done();
      })
    });
  });
  describe('asYamlString$', () => {
    it('should emit a Set<string> from plain', (done: DoneFn) => {
      testSet.config_files = [];
      spyOn(setsServiceStub, 'getById$').and.returnValue(of(testSet));
      spyOn(yamlParserStub, 'objectToYAML').and.returnValue({});
      target = new EditorService(
        yamlParserStub,
        formParserStub,
        setsServiceStub,
        routeStub
      );
      target.asYamlString$.subscribe(e => {
        expect(e.name).toBe(testSet.name);
        expect(e.create).toBe(testSet.create);
        expect(e.update).toBe(testSet.update);
        expect(e.config_files).toEqual([]);
        done();
      })
    });
  });
});