import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personnel-dialog',
  templateUrl: './personnel-dialog.component.html',
  styleUrls: ['./personnel-dialog.component.css']
})
export class PersonnelDialogComponent implements OnInit {

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

  public displayedColumns: string[] = ['id', 'name', 'classification'];
  public currentPersonnel = [
    {
      id: 123123,
      name: 'Bilbo Baggins',
      classification: 'Classification 1',
      selected: false,
      office: 'Calgary',
      team: 'Example Team 1',
      engagements: {}
    },
    {
      id: 123412,
      name: 'Frodo Baggins',
      classification: 'Classification 2',
      selected: false,
      office: 'Calgary',
      team: 'Example Team 1',
      engagements: {}
    },
    {
      id: 123471,
      name: 'Pippin Took',
      classification: 'Classification 1',
      selected: false,
      office: 'Calgary',
      team: 'Example Team 2',
      engagements: {}
    },
    {
      id: 123321,
      name: 'Samwise Gamgee',
      classification: 'Classification 1',
      selected: false,
      office: 'Okanagan Valley',
      team: 'Example Team 2',
      engagements: {}
    },
    {
      id: 123322,
      name: 'Gandalf the Grey',
      classification: 'Classification 2',
      selected: false,
      office: 'Okanagan Valley',
      team: 'Example Team 1',
      engagements: {}
    },
    {
      id: 111111,
      name: 'Jason Lyster',
      classification: 'Classification 2',
      selected: false,
      office: 'Okanagan Valley',
      team: 'Example Team 2',
      engagements: {}
    }
  ]
  
  public allPersonnel;
  public initialOffice = null;
  public initialTeam = null;
  public initialClassification = null;

  constructor() {}

  ngOnInit() {
    this.allPersonnel = Array.from(this.currentPersonnel)
  }

  public clearFilters(): void {
    this.currentPersonnel = this.allPersonnel;
    this.initialOffice = null;
    this.initialClassification = null;
    this.initialTeam = null;
  }

  public selected(inputType: string, event): void {
    this.currentPersonnel = this.currentPersonnel.filter(_ => _[inputType] === event.value);
  }

}