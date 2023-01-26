import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, Subscription } from 'rxjs'

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
  private apiSubscription$?: Subscription

  shapesToDraw: IIdShape[] = []
  selectedId: number | null = null

  diagramState$ = this.diagramStateService.diagramState.pipe(
    map(diagram => diagram ? diagram.components : [])
  )
  selectedId$ = this.diagramStateService.selectedShapeId
  noRouteParam = false

  constructor(
    private route: ActivatedRoute,
    private diagramApiService: DiagramApiService,
    private diagramStateService: DiagramStateService
  ) {}

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.apiSubscription$?.unsubscribe()
  }
}
