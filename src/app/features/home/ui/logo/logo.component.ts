import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SubscriberComponent} from "../../../../shared/components/subscriber/subscriber.component";

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [    CommonModule,
  ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent
  extends SubscriberComponent{
  @Input() logoUrl: string = '' ;
  @Input() altText: string = 'tutto rifiuto';

  constructor() {
    super();
  }

}
