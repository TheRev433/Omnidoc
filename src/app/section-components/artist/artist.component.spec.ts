import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistComponent } from './artist.component';

describe('ArtistComponent', (): void => {
  let component: ArtistComponent | undefined = undefined;
  let fixture: ComponentFixture<ArtistComponent> | undefined = undefined;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ArtistComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
