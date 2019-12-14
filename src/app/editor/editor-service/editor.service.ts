import { Injectable } from '@angular/core';
import { SetsService } from 'src/app/sets-service/sets.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  
  formGroup$: Observable<FormGroup>;
  yaml$: Observable<string>;
  
  constructor(
    private _setsService: SetsService,
    private _routeSnapshot: ActivatedRouteSnapshot
  ) {
    const id = _routeSnapshot.params.id;
    _setsService.getById$(id).pipe(
      
    )
  }

}
