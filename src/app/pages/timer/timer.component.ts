import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TimeformatPipe} from '../../pipes/timeformat.pipe';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [TimeformatPipe]
})
export class TimerComponent implements OnInit {
  seconds: number;
  interval: any;
  timeOff = false;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private timeformatPipe: TimeformatPipe) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      this.seconds = Number(params.get('seconds'));

      if (this.seconds && this.seconds > 0) {
        this.updateTitle();
        this.start();
      }
    });
  }

  start() {
    this.interval = setInterval( () => {
      if (this.seconds > 0) {
        this.timeOff = false;
        this.seconds--;
        this.updateTitle();
      } else {
        this.timeOff = true;
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  updateTitle() {
    this.titleService.setTitle(this.timeformatPipe.transform(this.seconds));
  }

  back() {
    this.router.navigate(['/']);
  }
}
