import { Component } from '@angular/core';
import { ButtonThemeComponent } from '../components/button-theme/button-theme.component';
import { ButtonLoginComponent } from '../components/button-login/button-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonThemeComponent, ButtonLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
}
