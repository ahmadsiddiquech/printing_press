import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyerPrintingComponent } from './flyer-printing.component';

describe('FlyerPrintingComponent', () => {
  let component: FlyerPrintingComponent;
  let fixture: ComponentFixture<FlyerPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlyerPrintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyerPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
