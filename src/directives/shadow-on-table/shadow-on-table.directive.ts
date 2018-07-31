import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';


@Directive({
  selector: '[shadowOnTable]'
})
export class ShadowOnTableDirective implements AfterContentChecked {

  @HostBinding('class.shadowOnLeft') shadowOnLeft: boolean = false;
  @HostBinding('class.shadowOnRight') shadowOnRight: boolean = false;
  @HostBinding('class.shadowOnRightAndOnLeft') shadowOnRightAndOnLeft: boolean = false;

  scrolling: number = 0;

  constructor(private elRef: ElementRef) {
  }

  ngAfterContentChecked() {
    this.insertShadows();
  }

  @HostListener('scroll') execute() {
    this.insertShadows();
  }

  @HostListener('window:resize') do() {
    this.insertShadows();
  }


  private insertShadows() {
    this.shadowOnLeft = true;
    this.shadowOnRight = true;
    this.scrolling = this.elRef.nativeElement.scrollLeft;

    if (this.scrolling > 0 && this.scrolling != this.elRef.nativeElement.scrollWidth - this.elRef.nativeElement.offsetWidth) {
      this.shadowOnRightAndOnLeft = true;
      this.shadowOnLeft = false;
      this.shadowOnRight = false;

    }

    if (this.scrolling == 0) {
      this.shadowOnRightAndOnLeft = false;
      this.shadowOnLeft = false;
    }

    if (this.scrolling == this.elRef.nativeElement.scrollWidth - this.elRef.nativeElement.offsetWidth) {
      this.shadowOnRightAndOnLeft = false;
      this.shadowOnRight = false;
    }
  }
}