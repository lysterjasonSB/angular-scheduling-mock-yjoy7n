import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-future-hire-dialog',
  templateUrl: './future-hire-dialog.component.html',
  styleUrls: ['./future-hire-dialog.component.css']
})
export class FutureHireDialogComponent implements OnInit {

  public exampleOffices: any = [
    { value: 'Calgary', viewValue: 'Calgary' },
    { value: 'Okanagan Valley', viewValue: 'Okanagan Valley' },
  ];

  public exampleTeams: any = [
    { value: 'Example Team 1', viewValue: 'Example Team 1' },
    { value: 'Example Team 2', viewValue: 'Example Team 2' },
  ];

  public exampleClassification: any = [
    { value: 'Classification 1', viewValue: 'Classification 1' },
    { value: 'Classification 2', viewValue: 'Classification 2' },
  ];

  public newHire = {
    id: 'Pending ID',
    selected: false,
    engagements: {},
  };
      
  constructor() { }

  ngOnInit() {
  }

  public selected(value, event) {
    this.newHire[value] = event.value;
  }
}