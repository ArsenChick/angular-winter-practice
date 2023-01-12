import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { catchError, map, Observable, of } from 'rxjs'
import { AlertService } from '@full-fledged/alerts'

import { URLS } from 'src/app/constants/urls'
import { Diagram } from 'src/app/interfaces/diagram.interface'

@Injectable({
  providedIn: 'root',
})
export class DiagramApiService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  getDiagramsPage(
    page: number,
    limitPerPage: number
  ): Observable<{ totalEntries: number; diagrams: Diagram[] }> {
    const newRequestParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limitPerPage)
    const url = `${URLS.diagrams}?${newRequestParams.toString()}`

    return this.http.get<Diagram[]>(url, { observe: 'response' }).pipe(
      map((res) => {
        const diagrams = res.body
        const totalEntries = Number(res.headers.get('x-total-count'))
        return {
          totalEntries: isNaN(totalEntries) ? 0 : totalEntries,
          diagrams: diagrams ?? [],
        }
      }),
      catchError(this.handleError())
    )
  }

  private handleError() {
    return (
      error: any
    ): Observable<{ totalEntries: number; diagrams: Diagram[] }> => {
      this.alertService.danger(
        `Request failed: ${error.message}. Please try again`
      )
      console.error(`Request failed: ${error.message}`)
      return of({ totalEntries: 0, diagrams: [] })
    }
  }
}
