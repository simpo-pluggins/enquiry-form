import { Directive, ElementRef, Input } from '@angular/core';
import { TEXT_SIZE, fontSize } from '../styles/index';
import { EventsService } from '../services/events.service';
import { TextSize } from '../styles/style.model';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[simpoTextSize]',
  standalone: true
})
export class TextSizeDirective {
  @Input() size?: TEXT_SIZE;
  @Input() type?: 'heading' | 'desc';
  constructor(private eventService: EventsService,
    private el: ElementRef
  ) { }

  ngOnChanges(){
    this.applyFontSize()
  }

  ngOnDestroy(){
    this.fontSizeSubscription?.unsubscribe()
  }

  applyFontSize() {

    if(this.type === 'heading') {
      this.removeHeadingClass();
      this.el.nativeElement.classList.add(this.size ? fontSize.heading[this.size] : fontSize.heading.Large);
    }
    if(this.type === 'desc') {
      this.removeDescClass();
      this.el.nativeElement.classList.add(this.size ? fontSize.desc[this.size] : fontSize.desc.Large);
    }


  }

  fontSizeSubscription?: Subscription
  changeFontSizeCheck(){
    this.fontSizeSubscription = this.eventService.textSizeChangeCheck.subscribe((res: any) => {
      if(res.id === this.el.nativeElement.id) {
        this.size = res.size;
        this.type = res.type;
        this.applyFontSize();
      }
    })
  }

  removeHeadingClass(){
    for(let values of Object.values(fontSize.heading)) {
      this.el.nativeElement.classList.remove(values);
    }
  }

  removeDescClass(){
    for(let values of Object.values(fontSize.desc)) {
      this.el.nativeElement.classList.remove(values);
    }
  }
}
