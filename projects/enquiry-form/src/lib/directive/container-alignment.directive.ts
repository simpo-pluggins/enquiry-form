import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EventsService } from '../services/events.service';
import { LayOutModel } from '../styles/style.model';

@Directive({
  selector: '[simpoContainerAlignment]',
  standalone: true,
})
export class SimpoContainerAligment implements OnInit, OnChanges {
  @Input('simpoContainerAlignment') layout?: LayOutModel;

  eventEmmitter: any;
  constructor(
    private el: ElementRef,
    private eventService: EventsService) { }

  ngOnInit(): void {
    this.setProperty();
  }
  ngOnDestroy() {

  }

  ngOnChanges(change: SimpleChanges): void {
    this.setProperty();
  }

  setProperty() {
    if (this.layout?.align == "left") {
      this.el.nativeElement.style.setProperty("margin-right", "auto");
      this.el.nativeElement.style.setProperty("margin-left", "unset");
    } else if (this.layout?.align == "right") {
      this.el.nativeElement.style.setProperty("margin-right", "unset");
      this.el.nativeElement.style.setProperty("margin-left", "auto");
    } else {
      this.el.nativeElement.style.setProperty("margin-left", "auto");
      this.el.nativeElement.style.setProperty("margin-right", "auto");
    }
  }
}
