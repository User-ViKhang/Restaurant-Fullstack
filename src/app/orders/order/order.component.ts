import { OrderItemRequest } from './../../shared/order-item.model';
import { CreateOrderRequest, Order } from './../../shared/order.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/order.service';
import { OrderItemComponent } from '../order-item/order-item.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { ResponeModel } from 'src/app/models/ResponeModel';
import { Customer } from 'src/app/shared/customer.model';
import { CdkDialogContainer } from '@angular/cdk/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderReq: OrderItemRequest[] = []
  onCreateOrder() {
    if (this.orderReq.length == 0) {
      this._orderService.orderItems.forEach(item => {
        var req: OrderItemRequest = {
          itemId: item.ItemId,
          quality: item.Quality
        }
        this.orderReq.push(req)
      });
    }
    const data: CreateOrderRequest = {
      orderNo: this._orderService.formData.OrderNo,
      pMethod: this._orderService.formData.PMethod,
      gTotal: this._orderService.formData.GTotal,
      customerId: this._orderService.formData.CustomerId,
      orderItems: this.orderReq
    };
    console.log(data)
    this._orderService.createOrderItem(data)
      .subscribe(response => console.log(response), error => console.error(error));
    this.orderReq = []
    this.resetForm()
  }
  customerList: Customer[] = []

  onDelete(itemId: number, index: number) {
    this._orderService.orderItems.splice(index, 1)
    this.updateGrandTotal()
  }

  constructor(
    private _orderService: OrderService,
    private dialog: MatDialog,
    private _customer: CustomerService) { }

  oderItemIndex: any = null

  AddOrEdit(oderItemIndex: any, orderId: number) {
    const dialogConfig = new MatDialogConfig
    dialogConfig.autoFocus = true
    dialogConfig.disableClose = true
    dialogConfig.width = "50%"; // Thiết lập chiều rộng
    dialogConfig.data = { oderItemIndex, orderId }
    this.dialog.open(OrderItemComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal()
    });
  }

  get _order() {
    return this._orderService
  }

  ngOnInit(): void {
    this.resetForm();
    this._customer.getCustomerList().subscribe(
      (res: ResponeModel) => {
        this.customerList = res.data;
      }, err => console.log("Error Fecth Data: " + err));
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    } else {
      if (this._orderService.orderItems.length == 0) {
        this._orderService.formData = {
          Id: 0,
          OrderNo: Math.floor(100000 + Math.random() * 900000),
          CustomerId: 0,
          PMethod: '',
          GTotal: 0
        };
      }
    }
    this._orderService.orderItems = []
  }

  updateGrandTotal() {
    this._orderService.formData.GTotal = this._orderService.orderItems.reduce((prev, curr) => prev + curr.Total, 0)
  }

}

