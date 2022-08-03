import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  styleUrls: ['./input.component.scss'],
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
  private _label: string = '';

  @Input() public set label(data: string | undefined) {
    if (data !== undefined) this._label = data;
  }

  public get label(): string {
    return this._label;
  }

  private _value: string = '';

  @Input() public set value(data: string | undefined) {
    this._value = data || '';
    this.valueChange.emit(data || '');
  }

  public get value(): string {
    return this._value;
  }

  private _disabled: boolean = false;

  @Input() public set disabled(data: boolean | undefined) {
    this._disabled = !!data;
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  @Output()
  public valueChange: EventEmitter<string> = new EventEmitter<string>();

  public constructor() {
    //
  }

  public ngOnInit(): void {
    //
  }
}
