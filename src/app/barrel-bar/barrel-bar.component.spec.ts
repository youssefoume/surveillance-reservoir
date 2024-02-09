import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrelBarComponent } from './barrel-bar.component';

describe('BarrelBarComponent', () => {
  let component: BarrelBarComponent;
  let fixture: ComponentFixture<BarrelBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarrelBarComponent]
    });
    fixture = TestBed.createComponent(BarrelBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
