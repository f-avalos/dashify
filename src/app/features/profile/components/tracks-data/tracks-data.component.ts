import { AfterViewInit, Component, ElementRef, inject, input, Renderer2, ViewChild } from '@angular/core';
import { TopTracks } from '../../../../core/models/topTracks.model';
import tracks from '../../utils/tracks.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracks-data',
  standalone: true,
  imports: [],
  templateUrl: './tracks-data.component.html',
  styleUrl: './tracks-data.component.css'
})
export class TracksDataComponent implements AfterViewInit {
  @ViewChild('content') paragraph: ElementRef | undefined;
  public paragraphs = tracks;
  public topTracks = input.required<TopTracks>();

  public renderer: Renderer2 = inject(Renderer2);
  public router: Router = inject(Router);

  getParagraph(){
    let paragraph = this.paragraphs[Math.floor(Math.random() * this.paragraphs.length)];
    let songs = []
    const paragraphArtists = this.renderer.createElement('p');

    do {
      songs[0] = this.topTracks().items[Math.floor(Math.random() * this.topTracks().items.length)];
      songs[1] = this.topTracks().items[Math.floor(Math.random() * this.topTracks().items.length)];
    } while (songs[0].artists[0].name === songs[1].artists[0].name);
    for (let i = 0; i < songs.length; i++) {
      paragraph.paragraph = paragraph.paragraph.replace('*', '<strong>'+songs[i].artists[0].name+'</strong>');
      paragraph.paragraph = paragraph.paragraph.replace('-', `'${songs[i].name}'`);
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
