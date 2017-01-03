import './global-styles.scss';

import { Component, Directive, ElementRef, Renderer, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

//
/////////////////////////
// ** Example Directive
// Notice we don't touch the Element directly

@Directive({
  selector: '[xLarge]'
})
export class XLargeDirective {
  constructor(element: ElementRef, renderer: Renderer) {
    // ** IMPORTANT **
    // we must interact with the dom through -Renderer-
    // for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    // ^^
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  styleUrls: ['app.component.scss'],
  template: `
  <h3 id="universal">Angular2 Universal</h3>
  <nav>
    <a routerLinkActive="router-link-active" routerLink="home">Home</a>
    <a routerLinkActive="router-link-active" routerLink="about">About</a>
    <a routerLinkActive="router-link-active" routerLink="todo">Todo</a>
    <a routerLinkActive="router-link-active" routerLink="lazy">Lazy</a>
  </nav>
  <div class="hero-universal">
    <div class="inner-hero">
      <div>
        <span xLarge>Universal JavaScript {{ title }}!</span>
      </div>

      Two-way binding: <input type="text" [value]="title" (input)="title = $event.target.value">

      <br>
      <br>

      <strong>Router-outlet:</strong>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `
})
export class AppComponent {
  title = 'ftw';
}
