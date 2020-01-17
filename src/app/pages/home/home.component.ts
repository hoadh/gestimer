import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  min = 0;
  isDragging = false;
  originPosition = {
    x: 0,
    y: 0
  };
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

  constructor() { }

  ngOnInit() {
  }

  hideCursor() {
    document.body.style.cursor = 'none';
  }

  showCursor() {
    document.body.style.cursor = 'auto';
  }

  startDrag(event) {
    this.originPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    this.sonarPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 45
    };
    console.log(event.target, this.sonarPosition);

    console.log('start drag', this.originPosition);
    this.isDragging = true;

    const img = new Image();
    img.src = '/assets/yellow.png';
    event.dataTransfer.setDragImage(img, 1, 1);
  }

  doDrag(event) {
    this.hideCursor();
    this.draggingPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    const distance = this.getDistance(this.sonarPosition, this.draggingPosition);
    this.getMin(distance);
    console.log('doDrag()', this.min);
    // console.log('dragging', this.distance);
  }

  @HostListener('mouseup', ['$event'])
  mouseUp(event) {
    this.lastPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    const distance = this.getDistance(this.sonarPosition, this.lastPosition);
    this.getMin(distance);
    console.log('mouseUp()', this.min);
  }

  endDrag() {
    const distance = this.getDistance(this.sonarPosition, this.lastPosition);
    this.getMin(distance);
    console.log('endDrag()', this.min);
    this.showCursor();
    this.isDragging = false;
  }

  getDistance(startPoint, endPoint): number {
    return Math.round(Math.sqrt(   Math.pow(startPoint.x - endPoint.x, 2) +
                                                Math.pow(startPoint.y - endPoint.y, 2)  ));
  }

  getMin(distance: number) {
    this.min = Math.round(distance / 10);
  }

}
