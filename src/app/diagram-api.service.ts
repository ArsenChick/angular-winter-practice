import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { catchError, map, Observable, of } from 'rxjs'
import { AlertService } from '@full-fledged/alerts'

import { IDiagram } from 'src/app/interfaces/diagram.interface'
import { URLS } from 'src/app/constants/urls'
import { EmptyDiagram } from './constants/shape-consts'

@Injectable({
  providedIn: 'root',
})
export class DiagramApiService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  getDiagramsPage(
    page: number,
    limitPerPage: number
  ): Observable<{ totalEntries: number; diagrams: IDiagram[] }> {
    const requestParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limitPerPage)
    const url = `${URLS.diagrams}?${requestParams.toString()}`

    return this.http.get<IDiagram[]>(url, { observe: 'response' }).pipe(
      map((res) => {
        const diagrams = res.body
        const totalEntries = Number(res.headers.get('x-total-count'))
        return {
          totalEntries: isNaN(totalEntries) ? 0 : totalEntries,
          diagrams: diagrams ?? [],
        }
      }),
      catchError(this.handleError({ totalEntries: 0, diagrams: [] }))
    )
  }

  getDiagram(id: string): Observable<IDiagram> {
    const requestParams = new HttpParams().set('id', id)
    const url = `${URLS.diagrams}?${requestParams.toString()}`

    return this.http.get<IDiagram[]>(url).pipe(
      map((diagramArray) => diagramArray[0] ?? EmptyDiagram),
      catchError(this.handleError(EmptyDiagram))
    )
  }

  private handleError<T>(result: T) {
    return (error: { message: string }): Observable<T> => {
      this.alertService.danger(
        `Request failed: ${error.message}. Please try again`
      )
      return of(result)
    }
  }
}
