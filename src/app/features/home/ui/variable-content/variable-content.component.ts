import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SubscriberComponent} from "../../../../shared/components/subscriber/subscriber.component";

@Component({
  selector: 'app-variable-content',
  standalone: true,
  imports: [    CommonModule,
  ],
  templateUrl: './variable-content.component.html',
  styleUrl: './variable-content.component.css'
})
export class VariableContentComponent extends SubscriberComponent {

  constructor() {
    super();
  }
}
