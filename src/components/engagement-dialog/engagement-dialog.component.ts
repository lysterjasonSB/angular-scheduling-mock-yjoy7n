import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engagement-dialog',
  templateUrl: './engagement-dialog.component.html',
  styleUrls: ['./engagement-dialog.component.css']
})
export class EngagementDialogComponent implements OnInit {

  constructor() { }

   public exampleClients: any = [
    { value: 'Client A', viewValue: 'Client A' },
    { value: 'Client B', viewValue: 'Client B' },
    { value: 'Client C', viewValue: 'Client C' },
  ];

  public engagementTypes: any = [
    { value: 'Assurance', viewValue: 'Assurance' },
    { value: 'Compliance Tax', viewValue: 'Compliance Tax' },
    { value: 'Other', viewValue: 'Other' },
  ];

  public displayedColumns: string[] = ['clientName', 'name', 'classification'];
  public currentEngagements: any = [
    {
      clientName: "Client A",
      name: "Engagement 1 - June 30, 2020",
      engType: "Assurance",
      expanded: true
    },
    {
      clientName: "Client A",
      name: "Engagement 2 - Dec 31, 2020",
      engType: "Compliance Tax",
      expanded: true
    },
    {
      clientName: "Client A",
      name: "Engagement 3 - June 30, 2020",
      engType: "Assurance",
      expanded: true
    },
    {
      clientName: "Client A",
      name: "Engagement 4 - June 30, 2020",
      engType: "Other",
      expanded: true
    },
    {
      clientName: "Client B",
      name: "Engagement 5 - Dec 31, 2020",
      engType: "Compliance Tax",
      expanded: true
    },
    {
      clientName: "Client B",
      name: "Engagement 6 - June 30, 2020",
      engType: "Other",
      expanded: true
    },
    {
      clientName: "Client B",
      name: "Engagement 7 - Dec 31, 2020",
      engType: "Assurance",
      expanded: true
    },
    {
      clientName: "Client B",
      name: "Engagement 8 - June 30, 2020",
      engType: "Compliance Tax",
      expanded: true
    },
    {
      clientName: "Client C",
      name: "Engagement 9 - Dec 31, 2020",
      engType: "Assurance",
      expanded: true
    },
    {
      clientName: "Client C",
      name: "Engagement 10 - June 30, 2020",
      engType: "Other",
      expanded: true
    },
    {
      clientName: "Client C",
      name: "Engagement 11 - June 30, 2020",
      engType: "Compliance Tax",
      expanded: true
    }
  ];

  public allEngagements;
  public initialType = null;
  public initialTeam = null;

  ngOnInit(): void {
    this.allEngagements = Array.from(this.currentEngagements);
  }

  public clearFilters(): void {
    this.currentEngagements = this.allEngagements;
    this.initialType = null;
    this.initialTeam = null;
  }

  public selected(inputType: string, event) {
    console.log(event);
    console.log(event.value);
    this.currentEngagements = this.currentEngagements.filter(_ => _[inputType] === event.value);
  }

}