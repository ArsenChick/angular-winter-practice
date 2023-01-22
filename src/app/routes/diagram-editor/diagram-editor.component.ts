import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

import { RouteParams } from 'src/app/constants/routes'
import { IIdShape } from 'src/app/interfaces/diagram.interface'

import { DiagramApiService } from 'src/app/diagram-api.service'
import { DiagramStateService } from './diagram-state.service'

@Component({
  selector: 'app-diagram-editor',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['./diagram-editor.component.scss'],
})
export class DiagramEditorComponent implements OnInit, OnDestroy {
  apiSubscription$?: Subscription
  shapesSubscription$?: Subscription
  selectedShapeSubscription$?: Subscription

  shapesToDraw: IIdShape[] = []
  selectedId: number | null = null
  noRouteParam = false

  constructor(
    private route: ActivatedRoute,
    private diagramApiService: DiagramApiService,
    private diagramStateService: DiagramStateService
  ) {}

  ngOnInit() {
    const diagramId = this.route.snapshot.paramMap.get(RouteParams.diagram.id)
    if (diagramId === null) {
      this.noRouteParam = true
      return
    }
    this.apiSubscription$ = this.diagramApiService
      .getDiagram(diagramId)
      .subscribe((diagram) =>
        this.diagramStateService.initializeDiagramData(diagram)
      )
    this.selectedShapeSubscription$ =
      this.diagramStateService.selectedShapeId.subscribe((selectedId) => {
        this.selectedId = selectedId
      })
    this.shapesSubscription$ = this.diagramStateService.diagramState.subscribe(
      (diagramToDraw) => {
        const newValues = diagramToDraw?.components
        this.shapesToDraw = newValues ? Array.from(newValues) : []
      }
    )
  }

  ngOnDestroy() {
    this.apiSubscription$?.unsubscribe()
    this.shapesSubscription$?.unsubscribe()
    this.selectedShapeSubscription$?.unsubscribe()
  }
}
