import { Injectable } from '@angular/core';
import { PlatformService } from '../platform/platform.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';

  constructor(private platformService: PlatformService) {}

  loadTheme(): void {

    let theme:string

    if(this.platformService.isPlatformBrowser()) {
      // Priorizar tema en localStorage
      if(localStorage.getItem(this.THEME_KEY)) {
        document.documentElement.setAttribute('data-theme', localStorage.getItem(this.THEME_KEY)||'light');
        return
      }

      // Si no hay tema guardado usar el tema del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = (prefersDark ? 'dark' : 'light');
      this.setTheme(theme);
    }
  }

  setTheme(theme: string): void {
    if(this.platformService.isPlatformBrowser()) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  getTheme(): string | null {
    if(this.platformService.isPlatformBrowser()) {
      return document.documentElement.getAttribute('data-theme') || 'light';
    }
    return ''
  }

  toggleTheme(): void {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
