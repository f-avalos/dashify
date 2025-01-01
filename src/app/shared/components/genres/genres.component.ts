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
      @if(btn()){
        <button (click)="delete()">
          <img src="/assets/images/icons/cross.svg" alt="">
        </button>
      }
    </div>`,
  styles: `
    :host{
      display: flex;
      border-radius: .7rem;
    }

    div{
      cursor: pointer;
      padding: .5rem 1rem;
      border-radius: .7rem;
      display: flex;
      gap: .5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);

      & span{
        font-weight: 600;
      }

      & button{
        display: flex;
        font-weight: 600;
        background-color: transparent;
        padding: 0;
        border: none;
        margin: 0;
        align-items: center;

        & img{
          width: .6rem;
          aspect-ratio: 1/1;
        }
      }
    }

  `
})
export class GenresComponent implements OnInit {
  public genre = input.required<string>();
  public btn = input<boolean>();
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
    "rgb(142, 68, 173)" ,    // Violeta (Elegancia/Distinción)
    "rgb(241, 196, 15)",    // Amarillo (Advertencia/Precaución)
    "rgb(52, 152, 219)",    // Azul Claro (Énfasis/Información)
    "rgb(39, 174, 96)",     // Verde Claro (Éxito/Confirmación)
    "rgb(192, 57, 43)",     // Rojo Oscuro (Error/Urgencia)

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

  delete(){
    console.log('cancelado!!!')
  }

}
