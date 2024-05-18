import { Component, OnInit, OnDestroy } from '@angular/core';

import { SubscriberComponent } from "../../../shared/components/subscriber/subscriber.component";
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends SubscriberComponent {

  constructor(

  ) {
    super();
  }


}
