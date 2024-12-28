import { Component, input } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { Following } from '../../../../core/models/followings.model';
import { Playlists } from '../../../../core/models/playlists.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box-data.component.html',
  styleUrl: './box-data.component.css'
})
export class BoxDataComponent {

  public user = input.required<User>();
  public type = input.required<string>();
  public following = input<Following>();
  public playlists = input<Playlists>();
}
