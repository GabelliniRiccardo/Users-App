import {AfterViewChecked, ContentChild, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDynamicHeight]'
})

export class DynamicHeightDirective implements AfterViewChecked {

  /**
   * @var {ElementRef} A reference to the element which contains the scrolling table.
   * The height of this element must change according to the screen height
   */
  @ContentChild('scrollingContainer') scrollingContainer: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewChecked() {
    if (window.innerWidth > 767) {
      const height = window.scrollY + this.scrollingContainer.nativeElement.offsetTop + 16;
      this.renderer.setStyle(this.scrollingContainer.nativeElement, 'height', 'calc(100vh - ' + height + 'px)');
    } else {
      this.renderer.setStyle(this.scrollingContainer.nativeElement, 'height', 'calc(100vh - ' + 200 + 'px)');
    }
  }
}
