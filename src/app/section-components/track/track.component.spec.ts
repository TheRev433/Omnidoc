import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackComponent } from './track.component';

describe('TrackComponent', (): void => {
  let component: TrackComponent | undefined = undefined;
  let fixture: ComponentFixture<TrackComponent> | undefined = undefined;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [TrackComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
