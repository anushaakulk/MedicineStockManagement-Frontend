import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { sales } from '../../_model/sales.model';
import { SalesService } from '../../_service/sales.service';

@Component({
  selector: 'app-addsales',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink],
  templateUrl: './addsales.component.html',
  styleUrl: './addsales.component.css'
})
export class AddsalesComponent {

  _response: any;
  title = 'Add Sales';
  editcode = 0;
  isedit = false;
  editdata!: sales;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: SalesService, private act: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.editcode = parseInt(this.act.snapshot.paramMap.get('id')!);
    if (this.editcode != 0 && !isNaN(this.editcode)) {
      this.isedit = true
      this.title = 'Edit Sales';
      this.customerform.controls['id'].disable();
      this.service.Getbycode(this.editcode).subscribe(item => {
        this.editdata = item;
        this.customerform.setValue({
          id: this.editcode, Sdate: this.editdata.Sdate,Refid:this.editdata.Refid,SupplierId:this.editdata.SupplierId
        })
      })
    }

  }

  customerform = this.builder.group({
    id: this.builder.control(0, Validators.required),
    Sdate: this.builder.control('', Validators.required),
    Refid:this.builder.control(0,Validators.required),
    SupplierId:this.builder.control(0,Validators.required)
  })

  Savecustomer() {
    if (this.customerform.valid) {

      let _obj: sales = {
        Sdate: this.customerform.value.Sdate as string,
        Refid:this.customerform.value.Refid as number,
        SupplierId:this.customerform.value.SupplierId as number
      }

      if (!this.isedit) {
        this.service.CreateSales(_obj).subscribe(item => {
          this._response = item;
          if (this._response.includes('Sales')) {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/SalesList');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.id=this.editcode;
        this.service.UpdateSales(_obj).subscribe(item => {
          this._response = item;
          if (this._response) {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/category');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }


    }
  }

}

