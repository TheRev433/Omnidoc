import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  styleUrls: ['./label.component.scss'],
  templateUrl: './label.component.html',
})
export class LabelComponent {
  private _value: string | number = '';
  @Input() public set value(data: string | number | undefined) {
    this._value = data || '';
  }

  public get value(): string | number {
    return this._value;
  }

  private _secondary: boolean = false;
  @Input() public set secondary(data: boolean | undefined) {
    this._secondary = !!data;
  }

  public get secondary(): boolean {
    return this._secondary;
  }

  private _ellipsis: boolean = false;
  @Input() public set ellipsis(data: boolean | undefined) {
    this._ellipsis = !!data;
  }

  public get ellipsis(): boolean {
    return this._ellipsis;
  }
}
