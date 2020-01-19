import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mins: number[] = [];
  min = 0;
  isDragging = false;

  sonarPosition = {
    x: 0,
    y: 0
  };

  draggingPosition = {
    x: 0,
    y: 0
  };
  lastPosition = {
    x: 0,
    y: 0
  };
  isDragLeave = false;

  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('Set Your Time!');
  }

  ngOnInit() {
  }

  hideCursor() {
    document.body.style.cursor = 'none';
  }

  showCursor() {
    document.body.style.cursor = 'auto';
  }

  startDrag(event) {
    this.min = 0;

    this.sonarPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 45
    };
    this.isDragging = true;

    if (event.dataTransfer) { // in case drag (on desktop browser)
      const img = new Image();
      img.src = '/assets/yellow.png';
      event.dataTransfer.setDragImage(img, -5, -5);
    }
  }

  onPan(evt) {
    this.sonarPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 45
    };
    this.isDragging = true;
    this.draggingPosition = {
      x: evt.center.x,
      y: evt.center.y
    };
    const distance = this.getDistance(this.sonarPosition, this.draggingPosition);
    this.getMin(distance);
    this.addMins(this.min);
    console.log(evt.center);
  }

  dragLeave() {
    this.isDragLeave = true;
  }

  doDrag(event) {
    this.hideCursor();
    this.draggingPosition = {
      x: event.clientX,
      y: event.clientY
    };
    const distance = this.getDistance(this.sonarPosition, this.draggingPosition);
    this.getMin(distance);
    this.addMins(this.min);
  }

  endDrag() {
    if (this.mins.length >= 2) {
      this.min = this.mins[this.mins.length - 2];
    } else {
      this.min = 0;
    }
    this.showModal();
    this.isDragLeave = false;
    this.isDragging = false;
    this.showCursor();
  }

  showModal() {
    $('#timingModal').modal();
    // focus on input
    $('#timingModal').on('shown.bs.modal', () => {
      $('#secondInput').focus();
    });
  }

  getDistance(startPoint, endPoint): number {
    return Math.round(Math.sqrt(   Math.pow(startPoint.x - endPoint.x, 2) +
                                                Math.pow(startPoint.y - endPoint.y, 2)  ));
  }

  getMin(distance: number) {
    this.min = Math.round(distance / 10);
  }

  addMins(min: number) {
    this.mins.push(min);
    while (this.mins.length > 10) {
      this.mins.shift();
    }
  }

  next() {
    const url = '/timer/' + (this.min * 60);
    this.router.navigate([url]);
  }

  test(msg: string) {
    console.log(msg);
  }
}
