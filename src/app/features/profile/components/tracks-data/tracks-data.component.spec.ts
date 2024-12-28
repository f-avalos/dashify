import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksDataComponent } from './tracks-data.component';

describe('TracksDataComponent', () => {
  let component: TracksDataComponent;
  let fixture: ComponentFixture<TracksDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
