import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusCardComponent } from './bouns-card.component';

describe('BonusCardComponent', () => {
  let component: BonusCardComponent;
  let fixture: ComponentFixture<BonusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonusCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
