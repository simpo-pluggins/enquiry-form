import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges, input } from '@angular/core';

@Directive({
  selector: '[simpoHoverBorderDirective]',
  standalone: true
})
export class SimpoHoverBorderDirective {

    @Input() simpoHoverBorderDirective?: any;
    
    @HostListener('mouseenter') onMouseEnter() {
        
        this.el.nativeElement.style.setProperty("outline", "2px solid blue");
        this.el.nativeElement.style.setProperty("border-radius", "5px");
    }
    @HostListener('mouseleave') onMouseLeave() {
        
        this.el.nativeElement.style.setProperty("outline", "2px solid transparent");
    }

    constructor(
        private readonly el: ElementRef,
    ) {
        
    }

}
