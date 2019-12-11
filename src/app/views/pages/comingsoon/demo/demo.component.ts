import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from '../../../../shared/animations/shared-animations';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  animations:[SharedAnimations]
})
export class DemoComponent implements OnInit {

  demos = [
    {
      name: 'Version 1',
      thumbnail: '../../../../../assets/images/demo/bluemain.PNG',
      link: '/pages/comingsoon/version1',
      badge: 'Free'
    },
    {
      name: 'Version 2',
      thumbnail: '../../../../../assets/images/demo/bluepart.PNG',
      link: '/pages/comingsoon/version2',
      badge: 'Pro'
    },
    {
      name: 'Version 3',
      thumbnail: '../../../../../assets/images/demo/redpart.PNG',
      link: '/pages/comingsoon/version3',
      badge: 'Pro'
    },
    {
      name: 'Version 4',
      thumbnail: '../../../../../assets/images/demo/purplemain.PNG',
      link: '/pages/comingsoon/version4',
      badge: 'Pro'
    },
    {
      name: 'Version 5',
      thumbnail: '../../../../../assets/images/demo/purplerev.PNG',
      link: '/pages/comingsoon/version5',
      badge: 'Pro'
    },
    {
      name: 'Version 6',
      thumbnail: '../../../../../assets/images/demo/purplepart.PNG',
      link: '/pages/comingsoon/version6',
      badge: 'Pro'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  getPro() {
    window.open('https://gum.co/ngsoon', '_blank')
  }

}
