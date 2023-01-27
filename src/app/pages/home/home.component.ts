import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'

import { DiagramApiService } from '../../diagram-api.service'

import { IDiagram } from 'src/app/interfaces/diagram.interface'
import { PAGINATOR_INIT_VALUES } from 'src/app/constants/home-page'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageIndex = PAGINATOR_INIT_VALUES.pageIndex
  limitPerPage = PAGINATOR_INIT_VALUES.limitPerPage
  diagramListObject$?: Observable<{
    totalEntries: number
    diagrams: IDiagram[]
  }>

  constructor(
    private router: Router,
    private diagramService: DiagramApiService
  ) {}

  ngOnInit(): void {
    this.getDiagramsDataFromServer(this.pageIndex, this.limitPerPage)
  }

  handlePageEvent(e: PageEvent): void {
    this.pageIndex = e.pageIndex
    this.getDiagramsDataFromServer(this.pageIndex, this.limitPerPage)
  }

  navigateToDiagram(id: string) {
    this.router.navigate(['diagram', id])
  }

  private getDiagramsDataFromServer(page: number, limitPerPage: number): void {
    this.diagramListObject$ = this.diagramService.getDiagramsPage(
      page + 1,
      limitPerPage
    )
  }
}
