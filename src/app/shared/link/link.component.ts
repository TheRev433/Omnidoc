import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  styleUrls: ['./link.component.scss'],
  templateUrl: './link.component.html',
})
export class LinkComponent {
  private _route: string = '';
  @Input() public set route(data: string | undefined) {
    this._route = data || '';
  }

  public get route(): string {
    return this._route;
  }

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
