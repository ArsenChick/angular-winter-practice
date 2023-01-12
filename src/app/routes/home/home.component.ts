import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'

import { Diagram } from 'src/app/interfaces/diagram.interface'
import { DiagramListService } from './diagram.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageIndex = 0
  limitPerPage = 5
  totalPages = 0
  diagrams: Diagram[] = []

  constructor(private diagramService: DiagramListService) {}

  ngOnInit(): void {
    this.getDiagramsDataFromServer(this.pageIndex, this.limitPerPage)
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex
    this.getDiagramsDataFromServer(this.pageIndex, this.limitPerPage)
  }

  private getDiagramsDataFromServer(page: number, limitPerPage: number) {
    this.diagramService
      .getDiagramsPage(page + 1, limitPerPage)
      .subscribe((tuple) => {
        this.totalPages = tuple[0]
        this.diagrams = tuple[1]
      })
  }
}
