import { AlbumComponent } from './section-components/album/album.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArtistComponent } from '@src/app/section-components/artist/artist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/shared.module';
import { TrackComponent } from './section-components/track/track.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, ArtistComponent, AlbumComponent, TrackComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    SharedModule,
  ],
  providers: [],
})
export class AppModule {}
