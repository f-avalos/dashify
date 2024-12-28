import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsDataComponent } from './artists-data.component';

describe('ArtistsDataComponent', () => {
  let component: ArtistsDataComponent;
  let fixture: ComponentFixture<ArtistsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
