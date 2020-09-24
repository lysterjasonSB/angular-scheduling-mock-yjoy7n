import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { EngagementDialogComponent } from '../engagement-dialog/engagement-dialog.component';
import { PersonnelDialogComponent } from '../personnel-dialog/personnel-dialog.component';

@Component({
  selector: 'app-enter-schedule',
  templateUrl: './enter-schedule.component.html',
  styleUrls: ['./enter-schedule.component.css']
})
export class EnterScheduleComponent implements OnInit {

  public days = [
    "27/09",
    "28/09",
    "29/09",
    "30/09",
    "1/10",
    "2/10",
    "3/10",
    "4/10",
    "5/10",
    "6/10",
    "7/10",
    "8/10",
    "9/10",
    "10/10",
    "11/10",
    "12/10",
    "13/10",
    "14/10",
    "15/10",
    "16/10",
    "17/10",
    "18/10",
    "19/10",
    "20/10"
  ];
  public weekendsArray = ["27/09", "3/10", "4/10", "10/10", "11/10",  "17/10", "18/10"]
  public endDateArr = this.days;
  public checkedClass = true;
  public currentEngPersonnel = new Set();
  public currentPersonnel = [];
  public currentEngagements = [];
  public currentFilteredEngagements = [];
  public displayedColumnsEng: string[] = ['id', 'name'].concat(this.days);
  public displayedColumns: string[] = ['id', 'name'].concat(this.days);
  public showClassification : boolean = false;

  public quickPersonnel: string;
  public quickEngagement: string;
  public endDate: string;
  public startDate: string;
  public quickHours: string;

  @ViewChild('dtable', {static: false}) dtable: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  public detectScheduling(event: any, day: any, indexInTable: any, person: any) {
    let dataClone = Array.from(this.currentEngagements);
    let spliced = dataClone.splice(0, indexInTable + 1).reverse();
    let engagement = spliced.find(_ => _.clientName);
    let engageIndex = this.currentEngagements.findIndex(_ => _.name === engagement.name);
    this.currentEngagements[engageIndex][day]= this.currentEngagements[engageIndex][day] ? (parseInt(event.target.value) + this.currentEngagements[engageIndex][day]) : parseInt(event.target.value);
    let index = this.currentPersonnel.findIndex(_ => _.name === person.name);
    this.currentPersonnel[index][day] = this.currentPersonnel[index][day] ? this.currentPersonnel[index][day] + parseInt(event.target.value) : parseInt(event.target.value);
    this.currentPersonnel[index].engagements
  }

  public openPersonnelModal(): void {
    let dialogRef = this.dialog.open(PersonnelDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.currentPersonnel = result;
    });
  }

  public openEngagementModal(): void {
    let dialogRef = this.dialog.open(EngagementDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.currentEngagements = result;
      this.currentFilteredEngagements = this.currentEngagements.filter(_ => _.engType);
    });
  }

  public getHours(personnel, day) {
    if (personnel[day] === 'personal') { return 0 }
    else { return personnel[day] ? 8 - personnel[day] : 8 }
  }

  public parseEndDate(event): void {
    let index = this.days.indexOf(event.value) + 1;
    this.endDateArr = this.endDateArr.splice(index)
  }

  public assignQuickClient(row): void {
    this.quickPersonnel = row.name;
  } 

  public assignQuickEngagement(row): void {
    this.quickEngagement = row.name;
  } 

  public toggleClassification(): void {
    this.showClassification ? false : true;
  }

  public drop(event) {
    if (event.previousContainer === event.container) {
      console.log(event)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.currentEngPersonnel = new Set(this.currentEngagements.filter(_ => !_.clientName));
    }
    this.dtable.renderRows();  
  }

  public getColor(personnel, day): string {
    if (this.weekendsArray.includes(day)) {
      return 'lightgrey';
    }
    if(personnel[day] === 'personal') {
      return '#b4c6e7'
    }
    if (personnel[day] >= 6.5) {
      return '#ffc7ce';
    } else if ((personnel[day] <= 6.5) && (personnel[day] > 3.5)) {
      return '#ffeb9c';
    // } else if ((personnel[day] <= 3.5) && (personnel[day] > 1.5)) {
    //   return 'rgba(154, 205, 50, 0.5)';
    } else {
      return '#c6efce';
    }
  }

  public getSchedColor(day): string {
    if (this.weekendsArray.includes(day)) { 
      return 'lightgrey';
    }
  }

  public quickEntry(): void {
    let start = this.days.indexOf(this.startDate);
    let end = this.days.indexOf(this.endDate) + 1;
    let personnelIndex = this.currentPersonnel.findIndex(_ => _.name === this.quickPersonnel);
    let engageIndex = this.currentEngagements.findIndex(_ => _.name = this.quickEngagement);
    this.days.slice(start, end).forEach(_ => {
      this.currentPersonnel[personnelIndex][_] = parseInt(this.quickHours);
      this.currentEngagements[engageIndex][_]= this.currentEngagements[engageIndex][_] ? (parseInt(this.quickHours) + this.currentEngagements[engageIndex][this.quickHours]) : parseInt(this.quickHours); 
    });
    this.quickEngagement = null;
    this.quickPersonnel = null;
    this.startDate = null;
    this.endDate = null;
    this.quickHours = null;
    this.endDateArr = this.days;
  }

}