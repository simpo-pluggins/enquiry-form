import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[simpoColor]',
  standalone: true
})
export class ColorDirective implements OnChanges{
  @Input('simpoColor') bgColor?: string;

  constructor(private el: ElementRef,
    private eventService: EventsService) {
    }

  ngOnChanges(){
    this.applyColor();
    this.bgColorChangeCheck();
  }

  colorSubscription?: Subscription;

  ngOnDestroy(){
    this.colorSubscription?.unsubscribe()
  }

  applyColor(){
    if(this.bgColor){
      this.el.nativeElement.style.setProperty('color', this.getTextColor());
    }
  }

  bgColorChangeCheck(){
    this.colorSubscription = this.eventService.backgroundImageChangeCheck.subscribe((res: any) => {
      if(res.id === this.el.nativeElement.id){
        this.bgColor = res?.data?.color
        this.applyColor()
      }
    })
  }

  getTextColor() {
    if (this.bgColor) {

      // for 3 character hex code
      if (this.bgColor.length < 6) {
        let newBgColor: string = "#";
        for (let i=1; i<this.bgColor.length; i++) {
          newBgColor += this.bgColor[i]+this.bgColor[i];
        }
        this.bgColor = newBgColor;
      }
      const threshold = 130; // Adjust this threshold as needed
      const r = parseInt(this.bgColor.slice(1, 3), 16);
      const g = parseInt(this.bgColor.slice(3, 5), 16);
      const b = parseInt(this.bgColor.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      return brightness > threshold ? '#000000' : '#ffffff';
    }
    return "#ffffff;"
  }
}
