import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelComponent } from './label.component';

describe('LabelComponent', (): void => {
  let component: LabelComponent | undefined = undefined;
  let fixture: ComponentFixture<LabelComponent> | undefined = undefined;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LabelComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
