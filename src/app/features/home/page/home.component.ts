import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../../core/services/api/api.service';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from '../../../core/services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'Home',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Perfil - Dashify');
    this.meta.addTag({ name: 'description', content: 'Home page for the app' });
  }
  apiService: ApiService = inject(ApiService);
  authService: AuthService = inject(AuthService);

  redirect(): void {
    alert('Redirecting to login page');
  }

  async ngOnInit(): Promise<void> {
    this.apiService.getCurrentUser().subscribe();
  }
}
