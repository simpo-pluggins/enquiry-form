import { Directive, ElementRef, Input } from '@angular/core';
import { EventsService } from '../services/events.service';
import { BANNERALIGNMENT } from '../styles';
import { PositionLayoutModal } from '../styles/style.model';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[simpoPositionLayoutDirective]',
  standalone: true
})
export class PositionLayoutDirectiveDirective {
  @Input('simpoPositionLayoutDirective') positionLayout?: PositionLayoutModal;

  constructor(private el: ElementRef,
    private eventService :EventsService) {
      this.positionLayoutChangeCheck();
    }

  ngOnChanges(){
    this.changePositionLayout();
  }

  ngOnDestroy(){
    if(this.positionLayoutSubscription){
      this.positionLayoutSubscription.unsubscribe();
    }
  }

  changePositionLayout(){
    this.removeAllClassIfPresent();
    this.el.nativeElement.classList.add(BANNERALIGNMENT[this.positionLayout?.value as keyof typeof BANNERALIGNMENT]);
  }
  removeAllClassIfPresent(){
    this.el.nativeElement.classList.remove(BANNERALIGNMENT.left);
    this.el.nativeElement.classList.remove(BANNERALIGNMENT.right);
    this.el.nativeElement.classList.remove(BANNERALIGNMENT.top);
    this.el.nativeElement.classList.remove(BANNERALIGNMENT.bottom);
  }

  positionLayoutSubscription?: Subscription;
  positionLayoutChangeCheck(){
    this.positionLayoutSubscription = this.eventService.postionLayoutChangeChecks.subscribe((res:any) => {
      if(this.el.nativeElement.id === res.id){
        this.positionLayout = res.data;
        this.changePositionLayout();
      }
    })
  }
}
