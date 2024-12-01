import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PositionLayoutModal } from '../styles/style.model';

@Directive({
  selector: '[simpoBorderless]',
  standalone: true
})
export class SimpoBorderlessDirective implements OnChanges{
  @Input('simpoBorderless') simpoBorderless?: PositionLayoutModal;

  constructor(private el: ElementRef) {}

  ngOnChanges(){
    if (this.simpoBorderless?.value == "left") {
        this.el.nativeElement.style.setProperty('order', "0");
    } else if (this.simpoBorderless?.value == "right") {
        this.el.nativeElement.style.setProperty('order', "1");
    }
  }

  ngOnDestroy(){
  }

}
