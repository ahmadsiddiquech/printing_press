import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { OrderService } from '../common/services/order.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  loggedIn: any;
  user_id: any;
  result: any;
  orders: any;
  order_id: any;
  constructor(private order: OrderService, private auth: AuthService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.auth.isLoggedIn.subscribe(response => {
      this.loggedIn = response;
    });
    if (this.loggedIn) {
      this.order_id = this.router.snapshot.params.id;
      this.user_id = localStorage.getItem("user_id");
      this.order.getOrdersbyOrderId(this.order_id, this.user_id)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success === true) {
              this.orders = this.result.data;
            }
          }
        )
    } else {
      this.route.navigateByUrl('/login');
    }
  }

  printComponent(cmpName: any) {
    let printContents = document.getElementById(cmpName)!.innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
}
