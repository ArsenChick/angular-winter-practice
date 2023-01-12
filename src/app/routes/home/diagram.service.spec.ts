import { TestBed } from '@angular/core/testing'

import { DiagramListService } from './diagram.service'

describe('DiagramListService', () => {
  let service: DiagramListService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DiagramListService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
