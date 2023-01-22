import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'

import { IDiagram } from 'src/app/interfaces/diagram.interface'
import { DiagramApiService } from '../../diagram-api.service'
import { PaginatorInitValues } from 'src/app/constants/home-page'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pageIndex = PaginatorInitValues.pageIndex
  limitPerPage = PaginatorInitValues.limitPerPage
  totalEntries = PaginatorInitValues.totalEntries
  diagrams: IDiagram[] = []

  subscription$?: Subscription

  constructor(private diagramService: DiagramApiService) {}

  ngOnInit() {
    this.getDiagramsDataFromServer(this.pageIndex, this.limitPerPage)
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe()
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex
    this.getDiagramsDataFromServer(this.pageIndex, this.limitPerPage)
  }

  private getDiagramsDataFromServer(page: number, limitPerPage: number) {
    this.subscription$ = this.diagramService
      .getDiagramsPage(page + 1, limitPerPage)
      .subscribe((diagramListObject) => {
        this.totalEntries = diagramListObject.totalEntries
        this.diagrams = diagramListObject.diagrams
      })
  }
}
