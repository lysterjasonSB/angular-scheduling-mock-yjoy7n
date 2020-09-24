import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { EnterScheduleComponent } from '../components/enter-schedule/enter-schedule.component';
import { PersonnelDialogComponent } from '../components/personnel-dialog/personnel-dialog.component';
import { EngagementDialogComponent } from '../components/engagement-dialog/engagement-dialog.component';

@NgModule({
  imports:      [ BrowserModule,
                  BrowserAnimationsModule,
                  DragDropModule,
                  FormsModule,
                  MatButtonModule,
                  MatButtonToggleModule,
                  MatCheckboxModule,
                  MatDialogModule,
                  MatIconModule,
                  MatInputModule,
                  MatSelectModule,
                  MatSidenavModule,
                  MatTableModule,
                  ReactiveFormsModule
                ],
  declarations: [ AppComponent,
                  HeaderComponent,
                  EnterScheduleComponent,
                  EngagementDialogComponent,
                  PersonnelDialogComponent
                ],
  entryComponents: [
                  EngagementDialogComponent,
                  PersonnelDialogComponent
                 ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
