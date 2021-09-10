import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  myobj = [
    { name: "Faizan ", phone: '03093853354' },
    { name: "Faizan younas liaquat ", phone: '03093853354' },
    { name: "Faizan ", phone: '03093853354' },
    { name: "Faizan", phone: '03093853354' },
    { name: "Faizan", phone: '03093853354' },
    { name: "Faizan", phone: '03093853354' },
    { name: "Faizan", phone: '03093853354' },
    { name: "Faizan", phone: '03093853354' },
  ]
  closeResult = '';
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  @ViewChild('ref') ref: any = false;
  onClick(event: any) {
    event.preventDefault();
    console.log('onClick this.ref._checked ' + this.ref._checked);
    this.ref._checked = !this.ref._checked;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  checked = false;
  Save(value: any) {
    console.log(value)
  }
  ngOnInit(): void {
  }

}
