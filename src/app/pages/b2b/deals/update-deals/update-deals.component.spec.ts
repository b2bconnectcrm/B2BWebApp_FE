import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDealsComponent } from './update-deals.component';

describe('UpdateDealsComponent', () => {
  let component: UpdateDealsComponent;
  let fixture: ComponentFixture<UpdateDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
