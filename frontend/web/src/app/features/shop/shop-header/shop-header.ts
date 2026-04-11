import {Component, ElementRef, HostListener, signal, ViewChild} from '@angular/core';
import {RevealOnScroll} from '../../../shared/directives/reveal-on-scroll';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-shop-header',
  standalone: true,
  imports: [
    RevealOnScroll,
    RouterLink,
  ],
  templateUrl: './shop-header.html',
  styleUrls: ['./shop-header.css'],
})
export class ShopHeaderComponent {
  readonly open = signal(false);

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  toggle() {
    this.open.update(v => !v);
  }

  close() {
    this.open.set(false);
  }

  @HostListener('document:mousedown', ['$event'])
  onDocMouseDown(e: MouseEvent) {
    if (!this.open()) return;
    const target = e.target as Node;
    if (!this.el.nativeElement.contains(target)) this.close();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open()) this.close();
  }

}
