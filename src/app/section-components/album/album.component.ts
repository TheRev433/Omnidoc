import { ActivatedRoute, Params } from '@angular/router';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  AlbumItemT,
  BaseItemT,
  ImageT,
  SearchResultRecordT,
  SearchResultT,
  SpotifySearchPluralTypesE,
  SpotifySearchTypesE,
} from '@src/app/entities/spotify';
import { CommonUtilities } from '@src/app/services/common.utilities';
import { debounce } from '@src/app/decorators/decorators';
import { SpotifyService } from '@src/app/services/spotify.service';

interface RenderedAlbumItemI {
  artists: BaseItemT<SpotifySearchTypesE.artist>[];
  id: string;
  image: string | null;
  name: string;
  year: number;
}

@Component({
  selector: 'app-album',
  styleUrls: ['./album.component.scss'],
  templateUrl: './album.component.html',
})
export class AlbumComponent implements AfterViewInit {
  @ViewChild('contentElementRef', { static: false })
  private readonly contentElementRef: ElementRef | undefined = undefined;

  public renderedAlbumItems: RenderedAlbumItemI[] = [];
  public query: string = '';
  public artistId: string | undefined = undefined;
  private offset: number = 0;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly spotifyService: SpotifyService
  ) {
    this.route.params.subscribe((params: Params): void => {
      this.artistId = params['artistId'];
    });
  }

  public async ngAfterViewInit(): Promise<void> {
    this.getAlbumsByArtistId();
  }

  public getAlbumsByArtistId(): void {
    if (this.artistId) {
      this.spotifyService
        .getAlbumsByArtistId(this.artistId, this.offset)
        .subscribe({
          next: (data: SearchResultRecordT<AlbumItemT>): void => {
            this.buildRenderedAlbumITems(data, !this.offset);
            this.checkForScroll(data);
          },
        });
    } else this.renderedAlbumItems = [];
  }

  public getAlbumsByKeyword(): void {
    if (this.query) {
      this.spotifyService
        .searchByQuery(this.query, [SpotifySearchTypesE.album], this.offset)
        .subscribe({
          next: (data: SearchResultT): void => {
            this.buildRenderedAlbumITems(
              data[SpotifySearchPluralTypesE.albums],
              !this.offset
            );

            this.checkForScroll(data[SpotifySearchPluralTypesE.albums]);
          },
        });
    } else this.renderedAlbumItems = [];
  }

  private buildRenderedAlbumITems(
    data: SearchResultRecordT<AlbumItemT> | undefined,
    overwrite: boolean
  ): void {
    if (overwrite) this.renderedAlbumItems = [];
    if (data) {
      data.items.forEach((item: AlbumItemT): void => {
        const image: ImageT | null = item.images.reduce(
          (previous: ImageT | null, current: ImageT): ImageT | null => {
            return previous && previous.height > current.height
              ? previous
              : current;
          },
          null
        );

        this.renderedAlbumItems.push({
          artists: item.artists,
          id: item.id,
          image: image?.url || null,
          name: item.name,
          year: new Date(item.release_date).getFullYear(),
        });
      });
    }
  }

  private checkForScroll(
    data: SearchResultRecordT<AlbumItemT> | undefined
  ): void {
    // Waiting to next cycle so the element ref gets updated and we can
    // properly measure scroll and client heights
    setTimeout((): void => {
      if (
        data?.next &&
        !CommonUtilities.doesElementRefHaveScrollbar(this.contentElementRef)
      ) {
        this.onScrolled();
      }
    });
  }

  @debounce()
  public onSearchChange(event: string): void {
    this.query = event;
    this.offset = 0;
    this.artistId = undefined;
    this.getAlbumsByKeyword();
  }

  @debounce()
  public onScrolled(): void {
    this.offset = this.renderedAlbumItems.length;
    if (this.artistId) this.getAlbumsByArtistId();
    else this.getAlbumsByKeyword();
  }
}
