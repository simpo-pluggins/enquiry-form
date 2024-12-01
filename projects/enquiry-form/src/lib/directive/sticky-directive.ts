import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[simpoSticky]',
  standalone: true
})
export class SimpoStickyDirective {
  @Input('simpoSticky') simpoSticky?: boolean;

  constructor(private el: ElementRef) {}

  ngOnChanges(){
    if (this.simpoSticky) {
        this.el.nativeElement.style.setProperty("position", "fixed");
        // this.el.nativeElement.style.setProperty("top", "0px");
        if(localStorage.getItem('REQUEST_FROM') == 'USER')
          this.el.nativeElement.style.setProperty("z-index", "10000002")
        else
        this.el.nativeElement.style.setProperty("z-index", "10000")
    } else {
        this.el.nativeElement.style.setProperty("position", "relative");
        // this.el.nativeElement.style.setProperty("top", "0px");
    }
  }

  ngOnDestroy(){
  }
}
