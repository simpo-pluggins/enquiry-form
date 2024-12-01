import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventsService } from '../services/events.service';
import { BackgroundModel } from '../styles/style.model';

@Directive({
  selector: '[simpoBackground]',
  standalone: true,
})
export class BackgroundDirective implements OnChanges {
  @Input('simpoBackground') simpoBackground?: BackgroundModel;
  @Input('scrollValue') scrollValue?: number = 0;

  eventEmmitter : any;
  constructor(
    private el: ElementRef,
    private eventService :EventsService) {
      if (this.eventEmmitter) {
        this.eventEmmitter.unsubscribe()
      }
      this.eventEmmitter = this.eventService.backgroundImageChangeCheck.subscribe(
        (res:any) => {
          if(this.el.nativeElement.id === res.id || res.globalThemeChange){
            if (res.data?.showImage && this?.scrollValue == 0) {
              this.el.nativeElement.style.setProperty(
                'background-image',
                `url(${res.data.image})`
              );
              this.el.nativeElement.style.setProperty(
                'background-position',
                `${res.data.position?.x}% ${res.data.position?.y}%`
              );
              this.el.nativeElement.style.setProperty('background-repeat', `no-repeat`);
              this.el.nativeElement.style.setProperty('background-size', `cover`);
              this.el.nativeElement.style.setProperty('color',this.getTextColor(res.data?.color))
            } else {
              this.el.nativeElement.style.setProperty(
                'background-color',
                res.data?.color
              );
              this.el.nativeElement.style.setProperty(
                'background-image',
                ``
              );
              this.el.nativeElement.style.setProperty('color',this.getTextColor(res.data?.color))
            }
          }
        }
      )
    }
    ngOnDestroy() {
      if (this.eventEmmitter) {
         this.eventEmmitter.unsubscribe()
       }
   }

  ngOnChanges(change:SimpleChanges): void {

    if (this.simpoBackground?.showImage && this.scrollValue == 0) {
      this.el.nativeElement.style.setProperty(
        'background-image',
        `url(${this.simpoBackground.image})`
      );
      this.el.nativeElement.style.setProperty(
        'background-position',
        `${this.simpoBackground.position?.x}% ${this.simpoBackground.position?.y}%`
      );
      this.el.nativeElement.style.setProperty('background-repeat', `no-repeat`);
      this.el.nativeElement.style.setProperty('background-size', `cover`);
      this.el.nativeElement.style.setProperty('color',this.getTextColor(this.simpoBackground?.color ? this.simpoBackground?.color : '#ffffff'))
    } else {
      this.el.nativeElement.style.setProperty(
        'background-color',
        this.simpoBackground?.color
      );
      this.el.nativeElement.style.setProperty('color',this.getTextColor(this.simpoBackground?.color ? this.simpoBackground?.color : '#ffffff'))
    }
  }

  getTextColor(bgColor: string) {
    if (bgColor) {
      const threshold = 130; // Adjust this threshold as needed
      const r = parseInt(bgColor.slice(1, 3), 16);
      const g = parseInt(bgColor.slice(3, 5), 16);
      const b = parseInt(bgColor.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      return brightness > threshold ? '#000000' : '#ffffff';
    }
    return "#ffffff;"
  }
}
