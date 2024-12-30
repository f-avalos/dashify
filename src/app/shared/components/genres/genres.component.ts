import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, input, OnInit } from '@angular/core';
import tinycolor from 'tinycolor2';


@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngStyle]="{'background': 'linear-gradient(180deg, '+colorLight+' 0%, '+colorDark+' 100%)'}">
      <span [ngStyle]="{'color':colorBase}">{{genre()}}</span>
    </div>`,
  styles: `
    :host{
      display: flex;
    }

    div{
      cursor: pointer;
      padding: .5rem 1rem;
      border-radius: .7rem;
      display: flex;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);

      & span{
        font-weight: 600;
      }
    }


  `
})
export class GenresComponent implements OnInit {
  public genre = input.required<string>();
  public colorBase:string = ''
  public colorLight:string = ''
  public colorDark:string = ''

  public coloresTagsRGBA = [
    "rgb(41, 128, 185)",    // Azul Oscuro (Énfasis/Información)
    "rgb(26, 188, 156)",    // Verde Turquesa (Éxito/Confirmación)
    "rgb(243, 156, 18)",     // Naranja Ocre (Advertencia/Precaución)
    "rgb(231, 76, 60)",     // Rojo Intenso (Error/Urgencia)
    "rgb(155, 89, 182)",    // Morado Oscuro (Creatividad/Especial)
    "rgb(52, 73, 94)",      // Gris Oscuro (Neutro/Informativo)
    "rgb(17, 219, 255)",   // Gris Claro (Secundario/Complementario)
    "rgb(46, 204, 113)",    // Verde Brillante (Positivo/Activo)
    "rgb(230, 126, 34)",    // Naranja Vivo (Llamativo/Atención)
    "rgb(142, 68, 173)"     // Violeta (Elegancia/Distinción)
  ];

  lightenColor(color: string, percent: number): string {
    return tinycolor(color).lighten(percent).toString();
  }

  darkenColor(color: string, percent: number): string {
    return tinycolor(color).darken(percent).toString();
  }

  getColors(){
    this.colorBase = this.coloresTagsRGBA[Math.floor(Math.random() * this.coloresTagsRGBA.length)];
    this.colorBase = this.darkenColor(this.colorBase, 10);
    this.colorLight = this.lightenColor(this.colorBase, 50);
    this.colorDark = this.lightenColor(this.colorBase, 40);
  }

  ngOnInit(): void {
    this.getColors()
  }

}
