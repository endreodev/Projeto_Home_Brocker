import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParceiroSharedService {
  private parceiroIDSource = new BehaviorSubject<string>('');
  currentParceiroID = this.parceiroIDSource.asObservable();

  constructor() { }

  changeParceiroID(id: string) {
    this.parceiroIDSource.next(id);
  }
}
