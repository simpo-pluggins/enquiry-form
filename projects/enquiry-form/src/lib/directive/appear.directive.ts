import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import {  ANIMATION_SPEED } from '../styles/types';
import { animation } from '../styles/index';
import { AnimationModel } from '../styles/style.model';

@Directive({
  selector: '[simpoAppear]',
  standalone: true
})
export class AppearDirective {

  @Input('simpoAppear') animationData?: AnimationModel;
  private observer: IntersectionObserver | undefined;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.createObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
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
            !this.elementRef.nativeElement.className.includes('visible')
          ) {
            this.elementRef.nativeElement.classList.add('visible');
            this.elementRef.nativeElement.style.setProperty('position', 'relative');
            this.elementRef.nativeElement.style.setProperty('animation-name', this.getAnimationName());

            if (this.animationData?.speed) {
              const speed = animation.speed[this.animationData?.speed];
              this.elementRef.nativeElement.style.setProperty('animation-duration', this.getAnimationSpeed(this.animationData.speed));
            }

            this.observer?.unobserve(this.elementRef.nativeElement);
          }
        });
      }, options);

      this.observer.observe(this.elementRef.nativeElement);
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

  getAnimationSpeed(speed:ANIMATION_SPEED){
    let speedInSec = ''
    for(let key of Object.keys(animation.speed)){
       if(key === speed){
        speedInSec =  animation.speed[key];
       }
    }
    return speedInSec;
  }

}
