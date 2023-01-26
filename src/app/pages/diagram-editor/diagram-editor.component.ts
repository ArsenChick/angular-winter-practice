import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, Subscription } from 'rxjs'

import { DiagramApiService } from 'src/app/diagram-api.service'
import { DiagramStateService } from './diagram-state.service'

import { ROUTE_PARAMS } from 'src/app/constants/urls'

@Component({
  selector: 'app-diagram-editor',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['./diagram-editor.component.scss'],
})
export class DiagramEditorComponent implements OnInit, OnDestroy {
  diagramState$ = this.diagramStateService.diagramState$.pipe(
    map(diagram => diagram ? diagram.components : [])
  )
  selectedId$ = this.diagramStateService.selectedShapeId$
  noRouteParam = false

  private apiSubscription$?: Subscription

  constructor(
    private route: ActivatedRoute,
    private diagramApiService: DiagramApiService,
    private diagramStateService: DiagramStateService
  ) {}

  ngOnInit(): void {
    const diagramId = this.route.snapshot.paramMap.get(ROUTE_PARAMS.diagram.id)
    if (diagramId === null) {
      this.noRouteParam = true
      return
    }
    this.apiSubscription$ = this.diagramApiService
      .getDiagram(diagramId)
      .subscribe((diagram) =>
        this.diagramStateService.initializeDiagramData(diagram)
      )
  }

  ngOnDestroy(): void {
    this.apiSubscription$?.unsubscribe()
  }
}
