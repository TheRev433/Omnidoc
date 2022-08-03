import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumComponent } from './album.component';

describe('AlbumComponent', (): void => {
  let component: AlbumComponent | undefined = undefined;
  let fixture: ComponentFixture<AlbumComponent> | undefined = undefined;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [AlbumComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
