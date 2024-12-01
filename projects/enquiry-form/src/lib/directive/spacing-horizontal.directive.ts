import { Directive, ElementRef, Input } from '@angular/core';
import { EventsService } from '../services/events.service';
import { SPACINGALIGN } from '../styles';
import { Subscription } from 'rxjs';
import { LayOutModel } from '../styles/style.model';

@Directive({
  selector: '[spacingHorizontal]',
  standalone: true
})
export class SpacingHorizontalDirective {
  @Input('spacingHorizontal') layout?: LayOutModel;

  constructor(private el: ElementRef,
    private eventService :EventsService) {
      this.positionLayoutChangeCheck();
    }

  ngOnChanges(){
    this.changeHorizontalSpacing();
  }

  ngOnDestroy(){
    if(this.positionLayoutSubscription){
      this.positionLayoutSubscription.unsubscribe();
    }
  }

  changeHorizontalSpacing() {
    if (window.innerWidth <= 475) {
      this.el.nativeElement.style.setProperty("padding-left", '1rem');
      this.el.nativeElement.style.setProperty("padding-right", '1rem');
      this.el.nativeElement.style.setProperty("padding-top", '0.8rem');
      this.el.nativeElement.style.setProperty("padding-bottom", '0.8rem');
    } 
    else if (window.innerWidth > 475 && window.innerWidth <= 1024) {
      this.el.nativeElement.style.setProperty("padding-left", SPACINGALIGN.small);
      this.el.nativeElement.style.setProperty("padding-right", SPACINGALIGN.small);
      this.el.nativeElement.style.setProperty("padding-top", '0.8rem');
      this.el.nativeElement.style.setProperty("padding-bottom", '0.8rem');
    } 
    else {
      this.el.nativeElement.style.setProperty("padding-left", SPACINGALIGN[this.layout?.spacingHorizontal as keyof typeof SPACINGALIGN]);
      this.el.nativeElement.style.setProperty("padding-right", SPACINGALIGN[this.layout?.spacingHorizontal as keyof typeof SPACINGALIGN]);
    }
  }
  


  positionLayoutSubscription?: Subscription;
  positionLayoutChangeCheck(){
    this.positionLayoutSubscription = this.eventService.postionLayoutChangeChecks.subscribe((res:any) => {
      if(this.el.nativeElement.id === res.id){
        this.layout = res.data;
        this.changeHorizontalSpacing();
      }
    })
  }
}
