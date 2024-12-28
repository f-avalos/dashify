import { Component } from '@angular/core';
import { ButtonThemeComponent } from '../components/button-theme/button-theme.component';
import { ButtonLoginComponent } from '../components/button-login/button-login.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ButtonThemeComponent, ButtonLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Inicio - Dashify');
    this.meta.addTag({ name: 'description', content: 'Login page for the app' });
  }
}
