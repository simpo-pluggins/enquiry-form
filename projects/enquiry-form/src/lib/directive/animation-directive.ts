import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { animation } from '../styles/index';
import { AnimationModel } from '../styles/style.model';
import { EventsService } from '../services/events.service';
import { ANIMATION_SPEED } from '../styles/types';
@Directive({
  selector: '[simpoAnimation]',
  standalone: true,
})
export class AnimationDirective implements OnChanges, OnInit, OnDestroy {
  @Input('simpoAnimation') animationData?: AnimationModel;
  eventServiceSubscription : any;
  private observer: IntersectionObserver | undefined;

  animationSpeed = animation
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private eventService : EventsService
  ) {
    this.eventServiceSubscription = this.eventService.animationChangeChecks.subscribe(
      (res:any) => {
        if(this.el.nativeElement.id === res.id){
          this.animationData = res.data
          this.applyAnimation();
        }
      }
    )
  }
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if(this.eventServiceSubscription){
      this.eventServiceSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.createObserver();
    // this.applyAnimation();
  }

  ngOnChanges(): void {
    // this.applyAnimation();
  }

  private createObserver(): void {

    const options = {
      root: null, // Use the viewport as the container
      threshold: 0.1 // Percentage of element visibility required to trigger the callback
    };
    if(typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (
            entry.isIntersecting &&
            !this.el.nativeElement.className.includes('visible')
          ) {
            this.el.nativeElement.classList.add('visible');
            this.el.nativeElement.style.setProperty('position', 'relative');
            this.el.nativeElement.style.setProperty('animation-name', this.getAnimationName());

            if (this.animationData?.speed) {
              const speed = animation.speed[this.animationData?.speed];
              this.el.nativeElement.style.setProperty('animation-duration', this.getAnimationSpeed(this.animationData.speed));
            }

            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      }, options);

      this.observer.observe(this.el.nativeElement);
    }

  }

  getAnimationName() {
    if (this.animationData?.type) {

      if (this.animationData?.type == 'left') {
        return 'animateleft'
      }
      if (this.animationData?.type == 'right') {
        return 'animateright'
      }
      if (this.animationData?.type == 'top') {
        return 'animatetop'
      }
      if (this.animationData?.type == 'bottom') {
        return 'animatebottom'
      }
      if (this.animationData?.type == 'fadeIn') {
        return 'opac'
      }
      if (this.animationData?.type == 'zoom') {
        return 'animatezoom'
      }
      if (this.animationData?.type === 'none') {
        return 'none'
      }

    }
    return null;
  }

  name: any;

  private applyAnimation() {
    if (this.animationData?.type) {
      const anim = animation.type[this.animationData?.type];
      // this.renderer.removeClass(this.el.nativeElement,anim);
      // this.renderer.addClass(this.el.nativeElement, anim);
      if(this.animationData.type == 'left'){
        this.name = 'animateleft'
      }
      if(this.animationData.type == 'right'){
        this.name = 'animateright'
      }
      if(this.animationData.type == 'top'){
        this.name = 'animatetop'
      }
      if(this.animationData.type == 'bottom'){
        this.name = 'animatebottom'
      }
      if(this.animationData.type == 'fadeIn'){
        this.name = 'opac'
      }
      if(this.animationData.type == 'zoom'){
        this.name = 'animatezoom'
      }
      if(this.animationData.type === 'none') {
        this.name = 'none'
      }
      this.el.nativeElement.style.setProperty('position', 'relative');
      this.el.nativeElement.style.setProperty('animation-name', this.name);
    }

    if (this.animationData?.speed) {
      const speed = animation.speed[this.animationData?.speed];
      this.el.nativeElement.style.setProperty('position', 'relative');
      this.el.nativeElement.style.setProperty('animation-name', this.name);
      this.el.nativeElement.style.setProperty('animation-duration', this.getAnimationSpeed(this.animationData.speed));
    }
  }

  getAnimationSpeed(speed:ANIMATION_SPEED){
    let speedInSec = ''
    for(let key of Object.keys(animation.speed)){
       if(key === speed){
        speedInSec =  animation.speed[key];
       }
    }
    return speedInSec;
  }

  animationTypes : any ={
    left : "animateleft",
    right : "animateright",
    bottom :"animatebottom",
    top : "animatetop",
    zoom : "animatezoom",
    fadeIn : "opac"
  }
}
