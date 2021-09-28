import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { OrderService } from '../common/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  loggedIn: any;
  user_id: any;
  result: any;
  orders: any;

  constructor(private order: OrderService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.isLoggedIn.subscribe(response => {
      this.loggedIn = response;
    });
    if (this.loggedIn) {
      this.user_id = localStorage.getItem("user_id");
      this.order.getOrders(this.user_id)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success === true) {
              this.orders = this.result.data;
            }
          }
        )
    }
  }

}
