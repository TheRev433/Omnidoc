import { ActivatedRoute, Params } from '@angular/router';
import {
  BaseItemT,
  SearchResultRecordT,
  SearchResultT,
  SpotifySearchPluralTypesE,
  SpotifySearchTypesE,
  TrackItemT,
} from '@src/app/entities/spotify';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { debounce } from '@src/app/decorators/decorators';
import { PageEvent } from '@angular/material/paginator';
import { SpotifyService } from '@src/app/services/spotify.service';

interface RenderedAlbumItemI {
  artists: BaseItemT<SpotifySearchTypesE.artist>[];

  duration: number;
  explicit: boolean;
  id: string;
  link: string;
  name: string;
  position: number;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-track',
  styleUrls: ['./track.component.scss'],
  templateUrl: './track.component.html',
})
export class TrackComponent implements OnInit {
  // Table related
  public pagedRenderedTrackItems: RenderedAlbumItemI[] = [];
  public hoverPosition: number | undefined = undefined;
  private lastPageEvent: PageEvent | undefined = undefined;
  private offset: number = 0;
  public readonly initialPageSize: number = 5;
  public readonly pageSizeOptions: number[] = [5, 10, 20, 30, 50];
  public readonly displayedColumns: string[] = ['position', 'name', 'duration'];
  public loading: boolean = false;

  // Tracks related
  public lastTracks: SearchResultRecordT<TrackItemT> | undefined = undefined;
  private renderedTrackItems: RenderedAlbumItemI[] = [];
  public albumId: string | undefined = undefined;
  public query: string = '';

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly spotifyService: SpotifyService
  ) {
    this.route.params.subscribe((params: Params): void => {
      this.albumId = params['albumId'];
    });
  }

  public ngOnInit(): void {
    this.getTracksByAlbumId();
  }

  public getTracksByAlbumId(): void {
    if (this.albumId) {
      this.loading = true;
      this.spotifyService
        .getTracksByAlbumId(
          this.albumId,
          this.offset,
          this.lastPageEvent?.pageSize || this.initialPageSize
        )
        .subscribe({
          next: (data: SearchResultRecordT<TrackItemT>): void => {
            this.lastTracks = data;
            this.buildRenderedTrackITems(!this.offset);
            this.applyPagedEvent();
            this.loading = false;
          },
        });
    } else {
      this.renderedTrackItems = [];
      this.pagedRenderedTrackItems = [];
    }
  }

  public getTracksByKeyword(): void {
    if (this.query) {
      this.loading = true;
      this.spotifyService
        .searchByQuery(
          this.query,
          [SpotifySearchTypesE.track],
          this.offset,
          this.lastPageEvent?.pageSize || this.initialPageSize
        )
        .subscribe({
          next: (data: SearchResultT): void => {
            this.lastTracks = data[SpotifySearchPluralTypesE.tracks];
            this.buildRenderedTrackITems(!this.offset);
            this.applyPagedEvent();
            this.loading = false;
          },
        });
    } else {
      this.renderedTrackItems = [];
      this.pagedRenderedTrackItems = [];
    }
  }

  public onPageChange(pageEvent: PageEvent): void {
    this.lastPageEvent = pageEvent;
    const startIndex: number = pageEvent.pageIndex * pageEvent.pageSize;
    const endIndex: number =
      startIndex + pageEvent.pageSize < pageEvent.length
        ? startIndex + pageEvent.pageSize
        : pageEvent.length;
    // There are more items pending for retrieve
    if (
      endIndex > this.renderedTrackItems.length &&
      endIndex <= pageEvent.length
    ) {
      this.offset =
        startIndex < this.renderedTrackItems.length
          ? this.renderedTrackItems.length
          : startIndex;
      if (this.albumId) this.getTracksByAlbumId();
      else this.getTracksByKeyword();
    }

    this.applyPagedEvent();
  }

  private applyPagedEvent(): void {
    const startIndex: number = this.lastPageEvent
      ? this.lastPageEvent.pageIndex * this.lastPageEvent.pageSize
      : 0;
    const endIndex: number =
      startIndex +
      (this.lastPageEvent ? this.lastPageEvent.pageSize : this.initialPageSize);

    this.pagedRenderedTrackItems = this.renderedTrackItems.slice(
      startIndex,
      startIndex + endIndex
    );
  }

  @debounce()
  public onSearchChange(event: string): void {
    this.query = event;
    this.offset = 0;
    this.albumId = undefined;
    this.getTracksByKeyword();
  }

  private buildRenderedTrackITems(overwrite: boolean): void {
    if (overwrite) this.renderedTrackItems = [];
    if (this.lastTracks) {
      this.lastTracks.items.forEach((item: TrackItemT): void => {
        this.renderedTrackItems.push({
          artists: item.artists,
          duration: item.duration_ms / 1000 / 60,
          explicit: item.explicit,
          id: item.id,
          link: item.external_urls?.spotify || '',
          name: item.name,
          position: this.renderedTrackItems.length + 1,
        });
      });
    }
  }
}
