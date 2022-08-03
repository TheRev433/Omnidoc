import { Component } from '@angular/core';

interface PathI {
  route: string;
  label: string;
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public readonly title: string = 'Omnidoc';

  public readonly paths: PathI[] = [
    {
      label: 'Artists',
      route: 'artist',
    },
    {
      label: 'Albums',
      route: 'album',
    },
    {
      label: 'Tracks',
      route: 'track',
    },
  ];
}
