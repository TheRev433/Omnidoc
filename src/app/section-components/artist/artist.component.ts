import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  ArtistItemT,
  ImageT,
  SearchResultRecordT,
  SearchResultT,
  SpotifySearchPluralTypesE,
  SpotifySearchTypesE,
} from 'src/app/entities/spotify';
import { CommonUtilities } from '@src/app/services/common.utilities';
import { debounce } from '@src/app/decorators/decorators';
import { SpotifyService } from 'src/app/services/spotify.service';

interface RenderedArtistItemI {
  genres: string[];
  id: string;
  image: string | null;
  name: string;
}

@Component({
  selector: 'app-artist',
  styleUrls: ['./artist.component.scss'],
  templateUrl: './artist.component.html',
})
export class ArtistComponent implements AfterViewInit {
  @ViewChild('contentElementRef', { static: false })
  private readonly contentElementRef: ElementRef | undefined = undefined;

  public renderedArtistItems: RenderedArtistItemI[] = [];

  public query: string = '';
  private offset: number = 0;

  public constructor(private readonly spotifyService: SpotifyService) {}

  public ngAfterViewInit(): void {
    this.getArtists();
  }

  public getArtists(): void {
    if (this.query) {
      this.spotifyService
        .searchByQuery(this.query, [SpotifySearchTypesE.artist], this.offset)
        .subscribe({
          next: (data: SearchResultT): void => {
            this.buildRenderedArtistITems(
              data[SpotifySearchPluralTypesE.artists],
              !this.offset
            );
            // Waiting to next cycle so the element ref gets updated and we can
            // properly measure scroll and client heights
            setTimeout((): void => {
              if (
                data[SpotifySearchPluralTypesE.artists]?.next &&
                !CommonUtilities.doesElementRefHaveScrollbar(
                  this.contentElementRef
                )
              ) {
                this.onScrolled();
              }
            });
          },
        });
    } else this.renderedArtistItems = [];
  }

  private buildRenderedArtistITems(
    data: SearchResultRecordT<ArtistItemT> | undefined,
    overwrite: boolean
  ): void {
    if (overwrite) this.renderedArtistItems = [];
    if (data) {
      data.items.forEach((item: ArtistItemT): void => {
        const image: ImageT | null = item.images.reduce(
          (previous: ImageT | null, current: ImageT): ImageT | null => {
            return previous && previous.height > current.height
              ? previous
              : current;
          },
          null
        );

        this.renderedArtistItems.push({
          genres: item.genres,
          id: item.id,
          image: image?.url || null,
          name: item.name,
        });
      });
    }
  }

  @debounce()
  public onSearchChange(event: string): void {
    this.query = event;
    this.offset = 0;
    this.getArtists();
  }

  public onScrolled(): void {
    this.offset = this.renderedArtistItems.length;
    this.getArtists();
  }
}
