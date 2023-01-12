import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DiagramCardComponent } from './diagram-card.component'

describe('DiagramCardComponent', () => {
  let component: DiagramCardComponent
  let fixture: ComponentFixture<DiagramCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagramCardComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DiagramCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
