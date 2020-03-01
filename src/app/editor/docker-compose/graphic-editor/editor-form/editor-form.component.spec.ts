import { EditorFormComponent } from "./editor-form.component";
import { FormArray, FormGroup } from '@angular/forms';

describe('EditorFormComponent', () => {
  let target: EditorFormComponent;

  beforeEach(() => {
    target = new EditorFormComponent();
  });

  it('should create', () => {
    expect(target).toBeTruthy();
  });

  describe('isArray', () => {
    it('should return form.controls if form is FormArray', () => {
      target.form = new FormArray([]);
      expect(target.isArray).toBe(target.form.controls);
    });
    it('should return undefined if form is NOT FormArray', () => {
      target.form = new FormGroup({});
      expect(target.isArray).toBeUndefined();
    });
  });
    
  describe('isGroup', () => {
    it('should return form.controls as array if form is FormGroup', () => {
      target.form = new FormGroup({});
      expect(target.isGroup).toEqual([]);
    });
    it('should return undefined if form is NOT FormGroup', () => {
      target.form = new FormArray([]);
      expect(target.isGroup).toBeUndefined();
    });
  });

});