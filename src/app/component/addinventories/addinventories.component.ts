import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Inventories } from '../../_model/inventories.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoriesService } from '../../_service/inventories.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addinventories',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink],
  templateUrl: './addinventories.component.html',
  styleUrl: './addinventories.component.css'
})
export class AddinventoriesComponent implements OnInit{
  _response: any;
  title = 'Add Inventories';
  editcode = 0;
  isedit = false;
  editdata!: Inventories;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: InventoriesService, private act: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.editcode = parseInt(this.act.snapshot.paramMap.get('id')!);
    if (this.editcode != 0 && !isNaN(this.editcode)) {
      this.isedit = true
      this.title = 'Edit Inventory';
      this.customerform.controls['id'].disable();
      this.service.Getbycode(this.editcode).subscribe(item => {
        this.editdata = item;
        this.customerform.setValue({
          id: this.editcode, productName: this.editdata.productName,expiry:this.editdata.expiry,units:this.editdata.units
        })
      })
    }

  }

  customerform = this.builder.group({
    id: this.builder.control(0, Validators.required),
    productName: this.builder.control('', Validators.required),
    expiry:this.builder.control('',Validators.required),
    units:this.builder.control(0,Validators.required)
  })

  SaveInventory() {
    if (this.customerform.valid) {

      let _obj: Inventories = {
        productName: this.customerform.value.productName as string,
        expiry:this.customerform.value.expiry as string,
        units:this.customerform.value.units as number
      }

      if (!this.isedit) {
        this.service.CreateInventory(_obj).subscribe(item => {
          this._response = item;
          if (this._response.includes('Inventories')) {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/Inventories');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.id=this.editcode;
        this.service.UpdateInventory(_obj).subscribe(item => {
          this._response = item;
          if (this._response) {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/Inventories');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }


    }
  }

}
