import { YAMLParserService } from './yaml-parser.service';
import { testYaml } from './test-yaml';

describe('YAMLParserService', () => {
  let subject: YAMLParserService;
  let testObject;

  beforeEach(() => {
    testObject = {
      version: 3.1,
      services: {
        redis: {
          foo: 'bar:buzz',
          john_dou: [ 'j', 'o', 'h', 'n' ]
        }
      }
    }
    subject = new YAMLParserService();
  });

  it('should create', () => {
    expect(subject).toBeTruthy();
  });

  describe('parse', () => {
    it('should return parsed yaml as object', () => {
      console.log(subject.parse(testYaml));
      expect(subject.parse(testYaml)).toEqual(testObject);
    });
  });
  
  describe('objectToYAML', () => {
    it('should return yaml from passed object', () => {
      console.log(subject.objectToYAML(testObject));
      expect(subject.objectToYAML(testObject).trim()).toBe(testYaml.trim());
    });
  });

});
