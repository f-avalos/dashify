import { AfterViewInit, Component, ElementRef, inject, input, Renderer2, ViewChild } from '@angular/core';
import { TopGenres } from '../../../../core/models/topGenres.model';
import { GenresComponent } from '../../../../shared/components/genres/genres.component';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import genres from '../../utils/genres.json';

@Component({
  selector: 'app-genres-data',
  standalone: true,
  imports: [GenresComponent, CdkDropList, CdkDrag],
  templateUrl: './genres-data.component.html',
  styleUrl: './genres-data.component.css'
})
export class GenresDataComponent implements AfterViewInit {
  @ViewChild('content') paragraph: ElementRef | undefined;
  public genres = genres;
  public topGenres = input.required<TopGenres[]>();

  public renderer: Renderer2 = inject(Renderer2);

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.topGenres(), event.previousIndex, event.currentIndex);
  }

  getParagraph(){
    let paragraph = this.genres[Math.floor(Math.random() * this.genres.length)];
    let genres = []
    const paragraphGenres = document.createElement('p');

    do {
      genres[0] = this.topGenres()[Math.floor(Math.random() * this.topGenres().length)];
      genres[1] = this.topGenres()[Math.floor(Math.random() * this.topGenres().length)];
      genres[2] = this.topGenres()[Math.floor(Math.random() * this.topGenres().length)];
    } while (genres[0].genre === genres[1].genre || genres[0].genre === genres[2].genre || genres[1].genre === genres[2].genre);
    for (let i = 0; i < genres.length; i++) {
      paragraph.paragraph = paragraph.paragraph.replace('*', '<strong>'+genres[i].genre+'</strong>');
    }
    this.renderer.setProperty(paragraphGenres, 'innerHTML', paragraph.paragraph);

    console.log(paragraph.paragraph);
    this.renderer.appendChild(this.paragraph?.nativeElement, paragraphGenres);
  }

  ngAfterViewInit(): void {
    this.getParagraph();
  }

}
