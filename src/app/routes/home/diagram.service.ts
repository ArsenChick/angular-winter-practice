import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http'
import { catchError, map, Observable, of, tap } from 'rxjs'

import { URLS } from 'src/app/constants/urls'
import { Diagram } from 'src/app/interfaces/diagram.interface'

@Injectable({
  providedIn: 'root',
})
export class DiagramListService {
  private diagramsUrl = URLS.diagrams
  private requestParams = new HttpParams()
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient) {}

  getDiagramsPage(
    page: number,
    limitPerPage: number
  ): Observable<[number, Diagram[]]> {
    const newRequestParams = this.requestParams
      .set('_page', page)
      .set('_limit', limitPerPage)
    const url = `${this.diagramsUrl}?${newRequestParams.toString()}`

    return this.http
      .get<HttpResponse<Diagram[]>>(url, { observe: 'response' })
      .pipe(
        // tap((_) => console.log('fetched diagrams')),
        catchError(this.handleError<HttpResponse<Diagram[]>>()),
        map((res) => {
          const diagrams = res.body as Diagram[]
          const totalPages = Number(res.headers.get('x-total-count'))
          return [totalPages ? totalPages : 0, diagrams ? diagrams : []]
        })
      )
  }

  private handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }
}
