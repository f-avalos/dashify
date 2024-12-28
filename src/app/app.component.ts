import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme/theme.service';
import { TitleService } from './core/services/title/title.service';
import { AuthService } from './core/services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet/>
  `,
  styles: ``
})
export class AppComponent implements OnInit {
  titleService: TitleService = inject(TitleService);
  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    //this.titleService.init();
    this.themeService.loadTheme();
    this.authService.isLoggedIn()
  }

}
