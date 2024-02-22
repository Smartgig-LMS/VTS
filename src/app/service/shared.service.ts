import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  ReloadGrid: EventEmitter<void> = new EventEmitter<void>();
  refresh(): void {
    this.ReloadGrid.emit();
  }
}
