
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { EventsService } from '../services/events.service';
import { BorderModel } from '../styles/style.model';

@Directive({
  selector: '[simpoBorder]',
  standalone: true,
})
export class BorderDirective implements OnChanges {
  @Input('simpoBorder') borderData?: BorderModel;

  constructor(
    private el: ElementRef,
    private eventService: EventsService
  ) {
    this.eventService.borderChangeChecks.subscribe(
      (res: any) => {

        if (this.el.nativeElement.id === res.id) {
          if (res.data?.display) {
            this.el.nativeElement.style.setProperty("border-radius", (res.data?.radius ?? 0) + "px");
            if(!res?.data?.direction) {
              res.data.direction = ["BOTTOM"]
            }
            if (res.data?.direction?.includes("ALL")) {
              res.data.direction = ["LEFT", "RIGHT", "TOP", "BOTTOM"]
            }
            for (let idx = 0; idx < (res.data?.direction?.length ?? 0); idx++) {
              this.el.nativeElement.style.setProperty(
                `border-` + res.data?.direction?.[idx]?.toLowerCase(),
                res.data.thickness + 'px' +
                ' ' +
                res.data.type +
                ' ' +
                res.data.color
              );
            }
          }
          else {
            this.el.nativeElement.style.setProperty(
              'border-bottom',
              'none'
            );
          }
        }
      }
    )
  }

  ngOnChanges(): void {
    if (this.borderData?.display) {
      if (this.borderData?.direction?.includes("ALL")) {
        this.borderData.direction = ["LEFT", "RIGHT", "TOP", "BOTTOM"]
      }
      this.el.nativeElement.style.setProperty("border-radius", (this.borderData?.radius ?? 0) + "px");

      for (let idx = 0; idx < (this.borderData?.direction?.length ?? 0); idx++) {
        this.el.nativeElement.style.setProperty(
          `border-` + this.borderData?.direction?.[idx].toLowerCase(),
          this.borderData.thickness + 'px' +
          ' ' +
          this.borderData.type +
          ' ' +
          this.borderData.color
        );
      }
    }
  }
}
