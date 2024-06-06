import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Order } from './shared/order.model';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';

const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent },
  {
    path: 'order', children: [
      { path: '', component: OrderComponent }, // /order
      { path: 'edit/:id', component: OrdersComponent } // /order/edit/5
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
