import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId : object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isPlatformBrowser(): boolean {
    return this.isBrowser;
  }
}
