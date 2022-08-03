import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';

describe('LinkComponent', (): void => {
  let component: LinkComponent | undefined = undefined;
  let fixture: ComponentFixture<LinkComponent> | undefined = undefined;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LinkComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
