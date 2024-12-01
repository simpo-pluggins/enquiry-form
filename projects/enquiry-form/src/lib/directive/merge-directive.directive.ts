import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[simpoMergeBackgroud]',
  standalone: true
})
export class MergeBackgroudDirective implements OnChanges {
  @Input('simpoMergeBackgroud') canMerge?: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(){
  }
}
