import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  it('should create the app', (): void => {
    const fixture: any = TestBed.createComponent(AppComponent);
    const app: any = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Omnidoc'`, (): void => {
    const fixture: any = TestBed.createComponent(AppComponent);
    const app: any = fixture.componentInstance;
    expect(app.title).toEqual('Omnidoc');
  });

  it('should render title', (): void => {
    const fixture: any = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: any = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'Omnidoc app is running!'
    );
  });
});
