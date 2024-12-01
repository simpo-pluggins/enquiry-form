import { Directive, ElementRef, Input } from '@angular/core';
import { EventsService } from '../services/events.service';

@Directive({
  selector: '[simpoWrapContainer]',
  standalone: true
})
export class SimpoWrapComntainer {
  @Input() simpoWrapContainer?: "ROW" | "COLUMN" = "COLUMN";
  constructor(
    private eventService: EventsService,
    private el: ElementRef
  ) { }

  ngOnChanges(){
    this.wrapContent();
  }

  ngOnDestroy(){
  }

  private wrapContent(): void {
    this.el.nativeElement.style.setProperty("flex-wrap", this.simpoWrapContainer == "ROW" ? 'nowrap' : 'wrap');
    this.el.nativeElement.style.setProperty("overflow-x", this.simpoWrapContainer == "ROW" ? 'auto' : 'hidden');
  }

}
