import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  styleUrls: ['./empty-state.component.scss'],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  private _showNoResults: boolean = false;

  @Input() public set showNoResults(data: boolean | undefined) {
    this._showNoResults = !!data;
  }

  public get showNoResults(): boolean {
    return this._showNoResults;
  }

  public readonly emptyLabel: string =
    'Start by typing some text to search for';

  public readonly noResultsLabel: string =
    "Your search didn't get any items. You could try typing different text";
}
