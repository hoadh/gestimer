import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  distance = 0;
  min = 0;
  isDragging = false;
  originPosition = {
    x: 0,
    y: 0
  };

  xDiff = 0;
  yDiff = 0;

  draggingPosition = {
    x: 0,
    y: 0
  };

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  startDrag(event) {
    this.originPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    this.xDiff = event.clientX - event.target.offsetLeft;
    this.yDiff = event.clientY - event.target.offsetTop;

    console.log('start drag', this.originPosition);
    this.isDragging = true;

    // const img = document.createElement('img');
    // img.src = 'http://kryogenix.org/images/hackergotchi-simpler.png';
    // event.dataTransfer.setDragImage(img, 50, 50);
  }

  doDrag(event) {
    this.draggingPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    this.getMin();
    console.log('dragging', this.distance);
  }

  endDrag() {
    this.getMin();
    this.isDragging = false;
  }

  getDistance(startPoint, endPoint): number {
    return Math.round(Math.sqrt(   Math.pow(startPoint.x - endPoint.x, 2) +
                                                Math.pow(startPoint.y - endPoint.y, 2)  ));
  }

  getCircleStyle() {
    return `display:fixed;left:${this.draggingPosition.x}px;top:${this.draggingPosition.y}px;`;
  }

  getMin() {
    this.distance = this.getDistance(this.originPosition, this.draggingPosition);
    this.min = Math.round(this.distance / 10);
  }

}
