import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressService } from '../common/services/address.service';
import { AuthService } from '../common/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
  providers: [MatSnackBar]
})
export class AddressBookComponent implements OnInit {
  modalReference: any;
  result: any;
  loggedIn: any;
  user_id: any;
  addresses: any;
  billing_address: any;
  delivery_address: any;


  constructor(private modalService: NgbModal, private addressService: AddressService, private auth: AuthService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.auth.isLoggedIn.subscribe(response => {
      this.loggedIn = response;
    });
    if (this.loggedIn) {
      this.user_id = localStorage.getItem("user_id");
      this.addressService.getAddress(this.user_id)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success === true) {
              this.addresses = this.result.data;
            }
          }
        )

      this.addressService.getDefaultBillingAddress(this.user_id)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success === true) {
              this.billing_address = this.result.data[0];
            }
          }
        )

      this.addressService.getDefaultDeliveryAddress(this.user_id)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success === true) {
              this.delivery_address = this.result.data[0];
            }
          }
        )
    }
  }
  enter_address(content: any) {
    this.modalReference = this.modalService.open(content, {}).result.then((result) => {
    });
  }
  add_address(form_data: any) {
    if (form_data.valid) {
      form_data.value.user_id = this.user_id;
      this.addressService.addAddress(form_data.value)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success === true) {
              this.addressService.getAddress(this.user_id)
                .subscribe(
                  response => {
                    this.result = response;
                    if (this.result.success === true) {
                      this.addresses = this.result.data;
                    }
                  }
                )
            }
            else {
              this.snackBar.open(this.result.message, 'Okay', {
                duration: 5 * 1000,
              });
            }
          }
        )
      this.modalService.dismissAll();
    }
  }

  delete_address(id: any) {
    this.addressService.deleteAddress(id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success === true) {
            this.snackBar.open(this.result.message, 'Okay', {
              duration: 5 * 1000,
            });
            this.addressService.getAddress(this.user_id)
              .subscribe(
                response => {
                  this.result = response;
                  if (this.result.success === true) {
                    this.addresses = this.result.data;
                  }
                }
              )
          }
        }
      )
  }

  set_billing_address(id: any) {
    this.addressService.setDefaultBillingAddress(id, this.user_id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success === true) {
            this.billing_address = this.result.data;
            this.snackBar.open(this.result.message, 'Okay', {
              duration: 5 * 1000,
            });
          }
        }
      )
  }

  set_delivery_address(id: any) {
    this.addressService.setDefaultDeliveryAddress(id, this.user_id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success === true) {
            this.delivery_address = this.result.data;
            this.snackBar.open(this.result.message, 'Okay', {
              duration: 5 * 1000,
            });
          }
        }
      )
  }
}
