import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyComponent } from './party/party.component';
import { PartyalldataComponent } from './partyalldata/partyalldata.component';
import { PartyformComponent } from './partyform/partyform.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
const routes:Routes=[
  {
    path:'',
    redirectTo:'partyList',
    pathMatch:'full'
  },
  {
    path:'partyList',
    component:PartyalldataComponent
  },
  {
    path:'partyForm',
    component:PartyformComponent
  }
]


@NgModule({
  declarations: [
    PartyComponent,
    PartyalldataComponent,
    PartyformComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule
  ]
})
export class PartyModule { }
