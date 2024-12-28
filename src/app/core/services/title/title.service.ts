import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private baseTitle = 'Dashify';

  private title: Title = inject(Title);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  init(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        const pageTitle = data['title'] || '';
        const fullTitle = `${pageTitle} - ${this.baseTitle}`;
        this.title.setTitle(fullTitle);
      })
  }
}
