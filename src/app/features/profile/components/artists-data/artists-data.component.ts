import { AfterViewInit, Component, ElementRef, inject, input, OnInit, Renderer2, viewChild, ViewChild } from '@angular/core';
import { TopArtists } from '../../../../core/models/topArtists.model';
import artists from '../../utils/artists.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists-data',
  standalone: true,
  imports: [],
  templateUrl: './artists-data.component.html',
  styleUrl: './artists-data.component.css'
})
export class ArtistsDataComponent implements AfterViewInit {
  @ViewChild('content') paragraph: ElementRef | undefined;

  public paragraphs = artists;
  public renderer: Renderer2 = inject(Renderer2);
  public router: Router = inject(Router);

  topArtists = input.required<TopArtists>();


  getParagraph(){
    let paragraph = this.paragraphs[Math.floor(Math.random() * this.paragraphs.length)];
    let strings = ['', '']
    const paragraphArtists = this.renderer.createElement('p');

    do {
      strings[0] = this.topArtists().items[Math.floor(Math.random() * this.topArtists().items.length)].name;
      strings[1] = this.topArtists().items[Math.floor(Math.random() * this.topArtists().items.length)].name;
    } while (strings[0] === strings[1]);
    for (let i = 0; i < strings.length; i++) {
      paragraph.paragraph = paragraph.paragraph.replace('*', '<strong>'+strings[i]+'</strong>');
    }
    this.renderer.setProperty(paragraphArtists, 'innerHTML', paragraph.paragraph);

    const nodes = paragraphArtists.childNodes;
    nodes.forEach((node:any) => {
      if(node.textContent.includes('aquí')){
        const parts = node.textContent.split('aquí');

        this.renderer.removeChild(paragraphArtists, node);

        const beforeText = this.renderer.createText(parts[0]);
        const afterText = this.renderer.createText(parts[1]);

        const link = this.renderer.createElement('a');
        this.renderer.setProperty(link, 'innerText', 'aquí');
        this.renderer.setStyle(link, 'cursor', 'pointer');
        this.renderer.listen(link, 'click', () => {
          this.router.navigate(['/home/review']);
        });

        this.renderer.appendChild(paragraphArtists, beforeText);
        this.renderer.appendChild(paragraphArtists, link);
        this.renderer.appendChild(paragraphArtists, afterText);
      }
    });

    this.renderer.appendChild(this.paragraph?.nativeElement, paragraphArtists);
  }

  ngAfterViewInit(): void {
    this.getParagraph();
  }
}
