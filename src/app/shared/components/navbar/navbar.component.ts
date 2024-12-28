import { Component, ElementRef, inject, OnInit, QueryList, ViewChild, viewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { ApiService } from '../../../core/services/api/api.service';
import { User } from '../../../core/models/user.model';
import { NgxSkeletonComponent } from 'ngx-skeleton';

@Component({
  selector: 'Navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgxSkeletonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: User | undefined

  @ViewChild('imgLogo', { static: true })
  imgLogoElement!: ElementRef<HTMLImageElement>;

  @ViewChild('switchThemeA', { static: true })
  switchThemeAElement!: ElementRef<HTMLAnchorElement>;

  @ViewChild('contentNav', { static: true })
  contentNavElement!: ElementRef<HTMLDivElement>;

  @ViewChild('toggleBtn', { static: true })
  toggleBtnElement!: ElementRef<HTMLInputElement>;

  authService: AuthService = inject(AuthService);
  themeService: ThemeService = inject(ThemeService);
  apiService: ApiService = inject(ApiService);

  async changeBtnThemeContent(): Promise<void>{
    const theme = await this.themeService.getTheme();
    const imgElement = this.switchThemeAElement.nativeElement.children[0] as HTMLImageElement
    const spanElement = this.switchThemeAElement.nativeElement.children[1] as HTMLSpanElement
    if(theme === 'dark'){
      this.imgLogoElement.nativeElement.src = '/assets/images/dashify-logotype-for-dark.svg';
      imgElement.src = '/assets/images/icons/moon.svg';
      spanElement.textContent = 'Oscuro';
    }else if (theme === 'light'){
      this.imgLogoElement.nativeElement.src = '/assets/images/dashify-logotype.svg';
      imgElement.src = '/assets/images/icons/sun.svg';
      spanElement.textContent = 'Claro';
    }
  }

  ngOnInit(): void {
    this.apiService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.changeBtnThemeContent();
  }

  btnToggle(e: Event ): void {
    if(e.target instanceof HTMLInputElement){
      if(e.target.checked){
        this.contentNavElement.nativeElement.style.transform = 'translateY(0)';
      }
      else{
        this.contentNavElement.nativeElement.style.transform = 'translateY(-150%)';
      }
    }
  }

  selectSection(): void {
    if(window.innerWidth <= 1024 && this.toggleBtnElement.nativeElement.checked){
      this.toggleBtnElement.nativeElement.checked = false;
      this.contentNavElement.nativeElement.style.transform = 'translateY(-150%)';
    }
  }

  async switchTheme(): Promise<void> {
    await this.themeService.toggleTheme();
    this.changeBtnThemeContent();
  }

  logout():void {
    this.authService.logout();
  }

  isLoggedIn(): void {
    /*
    this.authService.isLoggedIn().subscribe({
      next: (data) => {
        console.log(data['isLogged']);
      },
      error: (error) => {
        console.log(error);
      }
    });*/
  }
}
