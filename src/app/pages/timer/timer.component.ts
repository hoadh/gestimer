import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  seconds: number;
  interval: any;
  timeOff = false;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

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
        this.timeOff = false;
        this.seconds--;
      } else {
        this.timeOff = true;
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  back() {
    this.router.navigate(['/']);
  }
}
