import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { EventsService } from '../services/events.service';
import { BackgroundModel } from '../styles/style.model';

@Directive({
  selector: '[simpoOverlay]',
  standalone: true,
})
export class OverlayDirective implements OnChanges {
  @Input('simpoOverlay') backgroundData?: BackgroundModel;

  constructor(
    private el: ElementRef,
    private eventService :EventsService
    ) {
      this.eventService.colorOverlayChangeChecks.subscribe(
        (res:any) => {
          if(this.el.nativeElement.id === res.id){
            if (res.data?.showImage) {
              this.el.nativeElement.style.setProperty(
                'background-color',
                this.getRGBA(res.data.color, res.data.opacity)
              );
            }
          }
        }
      )
    }

  ngOnChanges(): void {
    if (this.backgroundData?.showImage) {
      this.el.nativeElement.style.setProperty(
        'background-color',
        this.getRGBA(this.backgroundData.color, this.backgroundData.opacity)
      );
    }
  }

  getRGBA(bgColor: string, opacity: number) {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  }
}
