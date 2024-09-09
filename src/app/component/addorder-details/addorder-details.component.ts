import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailsService } from '../../_service/order-details.service';
import { OrderDetails } from '../../_model/orderDetails.model';

@Component({
  selector: 'app-addorder-details',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink],
  templateUrl: './addorder-details.component.html',
  styleUrl: './addorder-details.component.css'
})
export class AddorderDetailsComponent {

  _response: any;
  title = 'Add Order Details';
  editcode = 0;
  isedit = false;
  editdata!: OrderDetails;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: OrderDetailsService, private act: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.editcode = parseInt(this.act.snapshot.paramMap.get('id')!);
    if (this.editcode != 0 && !isNaN(this.editcode)) {
      this.isedit = true
      this.title = 'Edit Order Details';
      this.customerform.controls['id'].disable();
      this.service.Getbycode(this.editcode).subscribe(item => {
        this.editdata = item;
        this.customerform.setValue({
          id: this.editcode, orderId: this.editdata.orderId,productId:this.editdata.productId,quantity:this.editdata.quantity,price:this.editdata.price
        })
      })
    }

  }

  customerform = this.builder.group({
    id: this.builder.control(0, Validators.required),
    orderId: this.builder.control(0, Validators.required),
    productId:this.builder.control(0,Validators.required),
    quantity:this.builder.control(0,Validators.required),
    price:this.builder.control(0,Validators.required)
  })

  Savecustomer() {
    if (this.customerform.valid) {

      let _obj: OrderDetails = {
        orderId: this.customerform.value.orderId as number,
        productId:this.customerform.value.productId as number,
        quantity:this.customerform.value.quantity as number,
        price:this.customerform.value.price as number
      }

      if (!this.isedit) {
        this.service.CreateOrderDetails(_obj).subscribe(item => {
          this._response = item;
          if (this._response.includes('Order-details')) {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/OrderDetails');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.id=this.editcode;
        this.service.UpdateOrderDetails(_obj).subscribe(item => {
          this._response = item;
          if (this._response) {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/OrderDetails');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }


    }
  }

}


