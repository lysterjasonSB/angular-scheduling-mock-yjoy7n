import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { EngagementDialogComponent } from '../engagement-dialog/engagement-dialog.component';
import { FutureHireDialogComponent } from '../future-hire-dialog/future-hire-dialog.component';
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
    "20/10",
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
  public collapseAll: boolean = false;
  public showClassification : boolean = false;

  public quickPersonnel: string;
  public quickEngagement: string;
  public endDate: string;
  public startDate: string;
  public quickHours: string;

  @ViewChild('dtable', {static: false}) dtable: any;

  constructor(public dialog: MatDialog, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
  }

  public checkCollapsable(index): boolean {
    let nextIndex = parseInt(index) + 1;
    if (nextIndex >= this.currentEngagements.length) {
      return false;
    }
    if (this.currentEngagements[nextIndex].clientName) {
      return false;
    } else {
      return true
    }
  }
  
  public detectScheduling(event: any, day: any, indexInTable: any, person: any) {
    let dataClone = Array.from(this.currentEngagements);
    let spliced = dataClone.splice(0, indexInTable + 1).reverse();
    let engagement = spliced.find(_ => _.clientName);

    // Sum hours for personnel
    let index = this.currentPersonnel.findIndex(_ => _.name === person.name);
    this.currentPersonnel[index].engagements[engagement.name].days[day] = parseInt(event.target.value);
  }

  public openPersonnelModal(): void {
    let dialogRef = this.dialog.open(PersonnelDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      let replacementArray = Array.from(this.currentPersonnel);
      replacementArray = replacementArray.concat(result);
      this.currentPersonnel = replacementArray;
    });
  }

  public openEngagementModal(): void {
    let dialogRef = this.dialog.open(EngagementDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.currentEngagements = result;
      this.currentFilteredEngagements = this.currentEngagements.filter(_ => _.engType);
    });
  }

  public openFutureHireModal(): void {
    let dialogRef = this.dialog.open(FutureHireDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      let replacementArray = Array.from(this.currentPersonnel);
      replacementArray.push(result);
      this.currentPersonnel = replacementArray;
    });
  }

  public collapseEngagement(engagement): void {
    engagement.expanded = engagement.expanded ? false : true;
    let dataClone = Array.from(this.currentEngagements);
    let beginningIndex = dataClone.findIndex(_ => _.name === engagement.name);
    dataClone.splice(0, beginningIndex + 1);
    let endValue = dataClone.find(_ => _.clientName);
    let collapsableElements;
    if (endValue) {
      let endIndex = dataClone.findIndex(_ => _.name === endValue.name);
      collapsableElements = dataClone.splice(0, endIndex);
    } else {
      collapsableElements = dataClone;
    }
    collapsableElements.forEach(_ => {
      _.engagements[engagement.name].hidden = !engagement.expanded;
    });
  }

  getHiddenValue(index): boolean {
    let currentPerson = this.currentEngagements[index];
    let dataClone = Array.from(this.currentEngagements);
    let spliced = dataClone.splice(0, index).reverse();
    let engagement = spliced.find(_ => _.clientName);
    return currentPerson.engagements[engagement.name].hidden
  } 

  public getTotalHoursForEng(engagement, day): number {
    let dataClone = Array.from(this.currentEngagements);
    let beginningIndex = dataClone.findIndex(_ => _.name === engagement.name);
    dataClone.splice(0, beginningIndex + 1);
    let endValue = dataClone.find(_ => _.clientName);
    let sumElements;
    if (endValue) {
      let endIndex = dataClone.findIndex(_ => _.name === endValue.name);
      sumElements = dataClone.splice(0, endIndex);
    } else {
      sumElements = dataClone;
    }
    if (sumElements.length > 0) {
      let sumOfHours = 0;
      sumElements.forEach(person => {
        if (person.engagements[engagement.name].days[day]) {
          sumOfHours += person.engagements[engagement.name].days[day];
        }
      });
      return sumOfHours;
    } else {
      return 0;
    }
  }

  public getHours(personnel, day): any {
    if (Object.keys(personnel.engagements).length === 0) {
      return 8;
    } else {
      let sumOfHours = 0;
      for (let key in personnel.engagements) {
        if (personnel.engagements[key].days[day]) {
          sumOfHours += personnel.engagements[key].days[day]
        }
      }
      return 8 - sumOfHours;
    }
  }

  public getSecondRowText(personnel) {
    if (this.checkedClass) {
      return `${personnel.name} - ${personnel.classification}`;
    } else {
      return personnel.name;
    }
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
      if (event.container.id === 'engagements-table') {
        if (event.previousIndex === event.currentIndex) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex); 
        } else if (event.previousIndex < event.currentIndex) {
          let dataClone = Array.from(this.currentEngagements);
          let spliced = dataClone.splice(0, event.previousIndex).reverse();
          let newKey = this.currentEngagements[event.currentIndex].name;
          let keyToReplace = spliced.find(_ => _.clientName).name;
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
          let person = this.currentEngagements[event.currentIndex];
          person.engagements[newKey] = person.engagements[keyToReplace]; 
          delete person.engagements[keyToReplace];
        } else {
          let person = this.currentEngagements[event.previousIndex];
          let dataCloneOne = Array.from(this.currentEngagements);
          let splicedOne = dataCloneOne.splice(0, event.previousIndex).reverse();
          let keyToReplace = splicedOne.find(_ => _.clientName).name;
          let dataClone = Array.from(this.currentEngagements);
          let spliced = dataClone.splice(0, event.currentIndex).reverse();
          let newKey = spliced.find(_ => _.clientName).name;
          person.engagements[newKey] = person.engagements[keyToReplace]; 
          delete person.engagements[keyToReplace];
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
      } else {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.currentEngPersonnel = new Set(this.currentEngagements.filter(_ => !_.clientName));
      let currentPerson = this.currentEngagements[event.currentIndex];
      let dataClone = Array.from(this.currentEngagements);
      let spliced = dataClone.splice(0, event.currentIndex).reverse(); 
      let engagement = spliced.find(_ => _.clientName);
      currentPerson.engagements[engagement.name] = { hidden: false, days: {}};
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
    let hours = this.getHours(personnel, day);
    if (hours <= 2) {
      return '#ffc7ce';
    } else if ((hours > 2) && (hours < 5)) {
      return '#ffeb9c';
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
    let dateRange = Array.from(this.days).slice(start, end);
    let engagementIndex = this.currentEngagements.findIndex(_ => _.name = this.quickEngagement)
    let person = this.currentPersonnel[this.currentPersonnel.findIndex(_ => _.name === this.quickPersonnel)];
    let engagement = this.currentEngagements[engagementIndex];
    let exists = person.engagements[engagement.name];

    dateRange.forEach(day => {
      if (!person[day]) {
        if (!person.engagements[engagement.name]) {
          person.engagements[engagement.name] = { hidden: false, days: {}};
          person.engagements[engagement.name].days[day] = parseInt(this.quickHours);
        } else {
          person.engagements[engagement.name].days[day] = parseInt(this.quickHours);
        }
      }
    });

    if (exists === undefined) {
      let dataClone = Array.from(this.currentEngagements)
      dataClone.splice(engagementIndex + 1, 0, person);
      this.currentEngagements = dataClone;
    }

    this.quickEngagement = null;
    this.quickPersonnel = null;
    this.startDate = null;
    this.endDate = null;
    this.quickHours = null;
    this.endDateArr = this.days;
  }

  public bindToValue(day: any, indexInTable: any, person: any) {
    let dataClone = Array.from(this.currentEngagements);
    let spliced = dataClone.splice(0, indexInTable + 1).reverse();
    let engagement = spliced.find(_ => _.clientName);

    // Sum hours for personnel
    let index = this.currentPersonnel.findIndex(_ => _.name === person.name);
    if (!this.currentPersonnel[index].engagements) {
      this.currentPersonnel[index].engagements[engagement.name] = { hidden: false, days: {}};
    }
    return this.currentPersonnel[index].engagements[engagement.name].days[day];
  }

}