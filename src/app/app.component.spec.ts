import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let target: AppComponent;

  beforeEach(() => {
    target = new AppComponent();
  });

  it('should create', () => {
    expect(target).toBeTruthy();
  });
});
