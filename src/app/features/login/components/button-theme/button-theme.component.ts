import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme/theme.service';

@Component({
  selector: 'ButtonTheme',
  standalone: true,
  imports: [],
  template: `
      <label id="toggle-btn" for="theme">
        <input type="checkbox" id="theme" [checked]="isDarkTheme" (change)="themeService.toggleTheme()">
        <span class="slider"></span>
      </label>

  `,
  styles: `
    #toggle-btn {
      position: fixed;
      display: inline-block;
      width: 44px;
      height: 44px;
      top: 1rem;
      right: 1rem;
      overflow: hidden;
      z-index: 1000;
      border-radius: 34px;

      background: #584def;
      background: -webkit-linear-gradient(45deg, #584def 0%, #c56aff 100%);
      background: linear-gradient(45deg, #584def 0%, #c56aff 100%);

      transition: all .2s ease;
    }

    #toggle-btn:hover{
      box-shadow: 0 0 10px #584def;
    }

    #toggle-btn:active{
      transform: scale(1.2);
    }

    #toggle-btn input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider{
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('/assets/images/toggle-theme.svg');
      background-position: left;
      transition: background-position .3s;
    }

    #toggle-btn input:checked + .slider {
      background-position: right;
    }
  `
})
export class ButtonThemeComponent {
  isDarkTheme: boolean = false;

  // Alternativa a usar constructor
  themeService: ThemeService = inject(ThemeService);

  async ngOnInit(): Promise<void> {
    this.isDarkTheme = await this.themeService.getTheme() === 'dark' ? true : false;
    this.themeService.loadTheme();
  }

  onThemeChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isDarkTheme = isChecked;

    this.themeService.setTheme(isChecked ? 'dark' : 'light');
  }
}
