import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { MatButtonModule } from '@angular/material/button'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { DiagramListService } from './diagram.service'
import { DiagramCardComponent } from './components/diagram-card/diagram-card.component'

@NgModule({
  declarations: [HomeComponent, DiagramCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
  ],
  providers: [DiagramListService],
})
export class HomeModule {}
