import { ElementRef } from '@angular/core';

export class CommonUtilities {
  public static doesElementRefHaveScrollbar(
    elementRef: ElementRef | undefined
  ): boolean {
    return (
      elementRef?.nativeElement.scrollHeight >
      elementRef?.nativeElement.clientHeight
    );
  }

  public static minutesToMilliseconds(minutes: number): number {
    return minutes * 60000;
  }
}
