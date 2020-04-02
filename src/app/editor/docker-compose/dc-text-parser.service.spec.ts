import { DCTextParserService } from "./dc-text-parser.service";
import { validYAML, invalidYaml } from './test-yaml';
import { parseDocument } from 'yaml';

describe('DCTextParserService', () => {
    let target: DCTextParserService;
    let modelParserStub;
    let validString: string;
    let invalidStrings: string[];
    let validModel = [
        {
            key: 'version',
            value: 3.1
        },
        {
            key: 'services',
            value: [
                {
                    key: 'redis',
                    value: [
                        {
                            key: 'foo',
                            value: 'bar'
                        },
                        {
                            key: 'boo',
                            value: [
                                { value: 'bazz' },
                                { key: 'john', value: 'doe' },
                                {
                                    key: 'muchas',
                                    value: [
                                        {
                                            key: 'gracias',
                                            value: [
                                                { value: 'a' },
                                                { value: 'm' },
                                                { value: 'i' },
                                                { value: 'g' },
                                                { value: 'o' },
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

    beforeEach(() => {
        modelParserStub = {
            index() {}
        };
        validString = validYAML;
        invalidStrings = invalidYaml;
        target = new DCTextParserService(modelParserStub);
    });

    it('should create', () => {
        expect(target).toBeTruthy();
    });

    describe('stringToModel', () => {
        it('should return valid model from valid string', () => {
            console.log(parseDocument(validYAML).contents);
            expect(target.stringToModel(validString)).toEqual(validModel);
        });
    });

    describe('modelToString', () => {
        it('should return valid yaml from model', () => {
            expect(target.modelToString(validModel)).toBe(validString);
        });
    });
});
