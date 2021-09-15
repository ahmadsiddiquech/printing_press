import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  orderDetail = [
    { id: 1, ref: "1234567", condition: "Dispached", size: "A1 594mm x 841mm ", type: "Poster Print", img: "https://img.freepik.com/free-psd/pumpkin-drink-poster-template_23-2148793092.jpg?size=338&ext=jpg" },
  ]

}
