import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  get(key: string) {
    return localStorage.getItem(key);
  }
  set(key: string, value: any) {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error(err);
    }
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
}