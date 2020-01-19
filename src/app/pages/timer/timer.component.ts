import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  seconds: number;
  interval: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      this.seconds = Number(params.get('seconds'));

      if (this.seconds && this.seconds > 0) {
        this.start();
      }
    });
  }

  start() {
    this.interval = setInterval( () => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
