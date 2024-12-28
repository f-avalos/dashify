import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { NgxSkeletonComponent } from 'ngx-skeleton';
import { User } from '../../../../core/models/user.model';
import { ApiService } from '../../../../core/services/api/api.service';
import { CountriesPipe } from '../../../../shared/pipes/countries/countries.pipe';

@Component({
  selector: 'app-detail-data',
  standalone: true,
  imports: [CommonModule, CountriesPipe],
  templateUrl: './detail-data.component.html',
  styleUrl: './detail-data.component.css'
})
export class DetailDataComponent {

  apiService: ApiService = inject(ApiService);

  public user = input.required<User>();

}
