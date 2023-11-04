import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooBarComponent } from './too-bar.component';

describe('TooBarComponent', () => {
  let component: TooBarComponent;
  let fixture: ComponentFixture<TooBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooBarComponent]
    });
    fixture = TestBed.createComponent(TooBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
