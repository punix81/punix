import { Component, OnInit, ViewChild } from '@angular/core';

import { RandomColorDirective } from './random-color.directive';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild(RandomColorDirective, { static: true }) yourName;

  constructor() { }

  ngOnInit() {
  }

}
