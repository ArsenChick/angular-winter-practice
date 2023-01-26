import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[appDynamicShape]',
})
export class DynamicShapeDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
