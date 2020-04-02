import { Injectable } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ModelParserService {

  index(model: IKeyValue<string | FormControl>, firstIndex: string) {
    model.id = firstIndex;
    if (Array.isArray(model.value)) {
      for (let i = 0; i < model.value.length; i++) {
        const index = `${firstIndex}_${i}`;
        this.index(model.value[i], index);
      }
    }
  }
}
