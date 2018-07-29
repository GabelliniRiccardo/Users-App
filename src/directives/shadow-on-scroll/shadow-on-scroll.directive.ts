import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShadowOnScroll]'
})
export class ShadowOnScrollDirective implements OnInit, OnDestroy {

  /**
   * @var {boolean} True if the directive must detect the scroll of whole window.
   * False if it has to detect the scoll of the elRef. Default = false
   */
  @Input() useWindowScroll: boolean = false;

  /**
   * @var {string} The name of the class for shadow to apply
   */
  @Input() shadowClass: string;

  /**
   * @var {number} The value of scroll from the top of window or elRef according to the flag 'useWindowScroll'
   */
  scrolling: number = 0;

  /**
   * Store the collection of DOM listeners in order to unsubscribe on component destroy.
   * @type {Function[]}
   * @private
   */
  private _listeners: Function[] = [];

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.useWindowScroll ?
      this._listeners.push(this.renderer.listen(window, 'scroll', this.scrollEvent)) :
      this._listeners.push(this.renderer.listen(this.elRef.nativeElement, 'scroll', this.scrollEvent));
  }

  scrollEvent = (): void => {
    this.useWindowScroll ? this.scrolling = window.scrollY : this.scrolling = this.elRef.nativeElement.scrollTop;
    this.scrolling > 0 ?
      this.renderer.addClass(this.elRef.nativeElement, this.shadowClass) :
      this.renderer.removeClass(this.elRef.nativeElement, this.shadowClass);
  }

  ngOnDestroy() {
    this._listeners.forEach((unsubscribe: Function) => unsubscribe());
  }
}
