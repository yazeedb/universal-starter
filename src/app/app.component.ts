import { Component } from '@angular/core';

import { ScriptsService } from './shared/scripts.service';

@Component({
  selector: 'app',
  styles: [`
   .active {
     background-color: gray;
     color: white;
   }
  `],
  template: `
    <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
    </nav>

    <p>Hello Angular Universal App</p>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private scriptsService: ScriptsService) {}

  ngOnInit() {
    this.scriptsService.updateExternalTag('https://code.jquery.com/jquery-3.1.1.min.js', () => {
      console.log('we got jQuery');
    });
  }
}
