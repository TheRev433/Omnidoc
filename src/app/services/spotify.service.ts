import {
  AlbumItemT,
  HydratedTokenT,
  SearchResultRecordT,
  SearchResultT,
  SpotifySearchPluralTypesE,
  SpotifySearchTypesE,
  TokenT,
  TrackItemT,
} from 'src/app/entities/spotify';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, take } from 'rxjs';
import { CommonUtilities } from '@src/app/services/common.utilities';
import { Injectable } from '@angular/core';

interface OptionsI {
  headers?: HttpHeaders;
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private readonly spotifyAuthUri: string =
    'https://accounts.spotify.com/api/token';

  private readonly spotifyBaseApiUri: string = 'https://api.spotify.com/v1/';

  private readonly client_id: string = '3eec1c6fc0744291ae6208647162ee85';
  private readonly client_secret: string = 'c9ecd70c7dd14dafb5f4f41f33861ef1';

  private readonly encoded: string = btoa(
    `${this.client_id}:${this.client_secret}`
  );

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `${this.token?.token_type} ${this.token?.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  }

  private readonly expirationOffset: number = 300000;

  private token: HydratedTokenT | undefined = undefined;

  private $tokenReady: Subject<void> = new Subject<void>();

  public constructor(private readonly http: HttpClient) {}

  public getToken(): any {
    if (this.token && !this.isTokenExpired()) {
      this.$tokenReady.next();
    } else {
      const body: string = 'grant_type=client_credentials';
      const options: OptionsI = {
        headers: new HttpHeaders({
          Authorization: 'Basic ' + this.encoded,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      };

      this.http
        .post<TokenT>(this.spotifyAuthUri, body, options)
        .pipe(take(1))
        .subscribe({
          next: (baseToken: TokenT): void => {
            this.token = {
              ...baseToken,
              expedition_time: new Date().getTime(),
            };
            this.$tokenReady.next();
          },
        });
    }
  }

  public searchByQuery(
    query: string,
    types: SpotifySearchTypesE[],
    offset: number = 0,
    limit: number = 20
  ): Subject<SearchResultT> {
    const requestedData: Subject<SearchResultT> = new Subject<SearchResultT>();
    this.$tokenReady.pipe(take(1)).subscribe({
      next: (): void => {
        const options: OptionsI = {
          headers: this.headers,
          params: new HttpParams()
            .set('limit', limit)
            .set('offset', offset)
            .set('q', query)
            .set('type', types.join(','))
            .set('market', 'MX'),
        };
        const fullUri: string = `${this.spotifyBaseApiUri}search`;

        this.http
          .get(fullUri, options)
          .pipe(take(1))
          .subscribe({
            next: (data: SearchResultT): void => {
              requestedData.next(data);
            },
          });
      },
    });

    this.getToken();
    return requestedData;
  }

  public getAlbumsByArtistId(
    artistId: string,
    offset: number = 0
  ): Subject<SearchResultRecordT<AlbumItemT>> {
    const requestedData: Subject<SearchResultRecordT<AlbumItemT>> = new Subject<
      SearchResultRecordT<AlbumItemT>
    >();
    this.$tokenReady.pipe(take(1)).subscribe({
      next: (): void => {
        const options: OptionsI = {
          headers: this.headers,
          params: new HttpParams()
            .set('limit', 20)
            .set('offset', offset)
            .set('market', 'MX'),
        };
        const fullUri: string = `${this.spotifyBaseApiUri}${SpotifySearchPluralTypesE.artists}/${artistId}/${SpotifySearchPluralTypesE.albums}`;

        this.http
          .get<SearchResultRecordT<AlbumItemT>>(fullUri, options)
          .pipe(take(1))
          .subscribe({
            next: (data: SearchResultRecordT<AlbumItemT>): void => {
              requestedData.next(data);
            },
          });
      },
    });

    this.getToken();
    return requestedData;
  }

  public getTracksByAlbumId(
    albumId: string,
    offset: number = 0,
    limit: number = 20
  ): Subject<SearchResultRecordT<TrackItemT>> {
    const requestedData: Subject<SearchResultRecordT<TrackItemT>> = new Subject<
      SearchResultRecordT<TrackItemT>
    >();
    this.$tokenReady.pipe(take(1)).subscribe({
      next: (): void => {
        const options: OptionsI = {
          headers: this.headers,
          params: new HttpParams()
            .set('limit', limit)
            .set('offset', offset)
            .set('market', 'MX'),
        };
        const fullUri: string = `${this.spotifyBaseApiUri}${SpotifySearchPluralTypesE.albums}/${albumId}/${SpotifySearchPluralTypesE.tracks}`;

        this.http
          .get<SearchResultRecordT<TrackItemT>>(fullUri, options)
          .pipe(take(1))
          .subscribe({
            next: (data: SearchResultRecordT<TrackItemT>): void => {
              requestedData.next(data);
            },
          });
      },
    });

    this.getToken();
    return requestedData;
  }

  //   HELPERS
  private isTokenExpired(): boolean {
    if (this.token) {
      const currentTime: number = new Date().getTime();
      //   if time elapsed since expedition time is greater than or equal to
      //   expires time. Expiration offset is just to refresh token some minutes
      //   before it expires
      if (
        currentTime - this.token.expedition_time + this.expirationOffset >=
        CommonUtilities.minutesToMilliseconds(this.token.expires_in)
      ) {
        this.token = undefined;
        return true;
      }
      return false;
    }
    return true;
  }
}
