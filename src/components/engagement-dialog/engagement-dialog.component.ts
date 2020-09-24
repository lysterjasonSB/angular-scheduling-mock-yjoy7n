import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engagement-dialog',
  templateUrl: './engagement-dialog.component.html',
  styleUrls: ['./engagement-dialog.component.css']
})
export class EngagementDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
      engType: "Assurance"
    },
    {
      clientName: "Client A",
      name: "Engagement 2 - Dec 31, 2020",
      engType: "Compliance Tax"
    },
    {
      clientName: "Client A",
      name: "Engagement 3 - June 30, 2020",
      engType: "Assurance"
    },
    {
      clientName: "Client A",
      name: "Engagement 4 - June 30, 2020",
      engType: "Other"
    },
    {
      clientName: "Client B",
      name: "Engagement 5 - Dec 31, 2020",
      engType: "Compliance Tax"
    },
    {
      clientName: "Client B",
      name: "Engagement 6 - June 30, 2020",
      engType: "Other"
    },
    {
      clientName: "Client B",
      name: "Engagement 7 - Dec 31, 2020",
      engType: "Assurance"
    },
    {
      clientName: "Client B",
      name: "Engagement 8 - June 30, 2020",
      engType: "Compliance Tax"
    },
    {
      clientName: "Client C",
      name: "Engagement 9 - Dec 31, 2020",
      engType: "Assurance"
    },
    {
      clientName: "Client C",
      name: "Engagement 10 - June 30, 2020",
      engType: "Other"
    },
    {
      clientName: "Client C",
      name: "Engagement 11 - June 30, 2020",
      engType: "Compliance Tax"
    }
  ];

  public selected(inputType: string, event) {
    console.log(event);
    console.log(event.value);
    this.currentEngagements = this.currentEngagements.filter(_ => _[inputType] === event.value);
  }

}