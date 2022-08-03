import { RouterModule, Routes } from '@angular/router';
// import { MenuComponent } from '@src/app/section-components/menu/menu.component';
import { AlbumComponent } from '@src/app/section-components/album/album.component';
import { ArtistComponent } from '@src/app/section-components/artist/artist.component';
import { NgModule } from '@angular/core';
import { TrackComponent } from '@src/app/section-components/track/track.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'artist',
  },
  {
    component: ArtistComponent,
    path: 'artist',
  },
  {
    component: AlbumComponent,
    path: 'album/:artistId',
  },
  {
    component: AlbumComponent,
    path: 'album',
  },
  {
    component: TrackComponent,
    path: 'track/:albumId',
  },
  {
    component: TrackComponent,
    path: 'track',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
