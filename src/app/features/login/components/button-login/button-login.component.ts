import { Component, Input } from '@angular/core';

@Component({
  selector: 'ButtonLogin',
  standalone: true,
  imports: [],
  template: `
    <a href="#" id="btn-login">{{content}}</a>
  `,
  styles: `
    #btn-login {
      display: block;
      width: 100%;
      max-width: 200px;
      margin: 0 auto;
      padding: 10px 20px;
      background-color: var(--accent);
      border: 1px solid #4E44D4;
      color: #fff;
      text-align: center;
      border-radius: 3rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    #btn-login:hover {
      box-shadow: 0 0 10px #4E44D4;
      background-color: #4E44D4;
    }

    #btn-login:active {
      transform: scale(0.95);
    }
  `
})
export class ButtonLoginComponent {
  @Input() content = '';
}
