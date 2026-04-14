import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScroll {
  @HostBinding('class.is-revealed')
  readonly isRevealedClass = true;
}


// import {Directive, ElementRef, HostBinding, signal, AfterViewInit, OnDestroy, } from '@angular/core';
//
// @Directive({
//   selector: '[appRevealOnScroll]',
//   standalone: true,
// })
// export class RevealOnScroll implements AfterViewInit, OnDestroy {
//
//   private readonly isRevealed = signal<boolean>(false);
//   private observer: IntersectionObserver | null = null;
//
//   @HostBinding('class.is-revealed')
//   get isRevealedClass(): boolean {
//     return this.isRevealed();
//   }
//
//   constructor(private readonly elementRef: ElementRef<HTMLElement>) {}
//
//   ngAfterViewInit(): void {
//     this.observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         this.isRevealed.set(true);
//         this.observer?.disconnect();
//       }
//     });
//
//     this.observer.observe(this.elementRef.nativeElement);
//   }
//
//   ngOnDestroy(): void {
//     this.observer?.disconnect();
//   }
//
// }
