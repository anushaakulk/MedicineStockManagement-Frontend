

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*
  it('should contain the title "About Us"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('About Us');
  });

  it('should contain the description paragraph', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Welcome to Med-Stock!');
  });
});*/


it('should display AboutUs information', () => {
  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.querySelector('h1')?.textContent).toContain('About Us');
  expect(compiled.querySelector('p')?.textContent).toContain('Welcome to Med-Stock! We provide a comprehensive inventory system for tracking medicines. Our goal is to ensure you have easy access to medicine information and a smooth purchasing experience.');
});
});

