import { HttpErrorResponse } from '@angular/common/http';
import { Order } from './../../shared/order.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponeModel } from 'src/app/models/ResponeModel';
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';
import { OrderItem } from 'src/app/shared/order-item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderItemComponent>,
    private _itemService: ItemService,
    private orderService: OrderService) { }

  onSubmit(form: NgForm) {
    if (this.validatorForm(form.value) == true) {
      if (this.data.oderItemIndex == null)
        this.orderService.orderItems.push(form.value)
      else
        this.orderService.orderItems[this.data.oderItemIndex] = this.formData
      this.dialogRef.close()
    }
  }

  formData: OrderItem = new OrderItem
  itemList: Item[] = []
  isValid: boolean = true

  updateTotal() {
    this.formData.Total = this.formData.Quality * this.formData.Price
  }

  changePrice(ctrl: any) {
    if (ctrl.selectedIndex == 0) this.formData.Price = 0
    this.formData.Price = this.itemList[ctrl.selectedIndex - 1].price
    this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].name
    if (this.formData.Quality > 0) {
      this.updateTotal()
    }

  }

  validatorForm(formData: OrderItem) {
    this.isValid = true
    if (formData.Quality == 0) this.isValid = false
    if (formData.ItemId == 0) this.isValid = false
    return this.isValid
  }

  ngOnInit(): void {
    console.log("Data received:", this.data);
    this._itemService.getItemList().subscribe(
      (res: ResponeModel) => {
        this.itemList = res.data;
        console.log(this.itemList)
      }, err => console.log("Error Fecth Data: " + err));

    if (this.data.oderItemIndex == null) {
      this.formData.ItemId = 0
      this.formData.Price = 0
      this.formData.Quality = 0
      this.formData.Total = 0
    } else {
      console.log(this.orderService.orderItems[this.data.oderItemIndex])
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.oderItemIndex])
    }
  }
}
