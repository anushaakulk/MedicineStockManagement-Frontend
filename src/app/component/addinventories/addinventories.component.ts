import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Inventories } from '../../_model/inventories.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoriesService } from '../../_service/inventories.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { medicine } from '../../_model/medicine.model';
import { MedicineService } from '../../_service/medicine.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-addinventories',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink,CommonModule,MatNativeDateModule,MatDatepickerModule],
  templateUrl: './addinventories.component.html',
  styleUrl: './addinventories.component.css'
})
export class AddinventoriesComponent implements OnInit{
  _response: any;
  title = 'Add Inventories';
  editcode = 0;
  isedit = false;
  editdata!: Inventories;
  medicines: medicine[] = [];
  selectedMedicine!: number;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: InventoriesService, private act: ActivatedRoute, private medicineService: MedicineService) {

  }

  ngOnInit(): void {
    this.loadMedicines();
    this.editcode = parseInt(this.act.snapshot.paramMap.get('id')!);
    if (this.editcode != 0 && !isNaN(this.editcode)) {
      this.isedit = true
      this.title = 'Edit Inventory';
      this.customerform.controls['id'].disable();
      this.service.Getbycode(this.editcode).subscribe(item => {
        this.editdata = item;
        this.customerform.setValue({
          id: this.editcode, productName: "",sku:this.editdata.sku,expiry: this.editdata.expiry ? new Date(this.editdata.expiry).toISOString().split('T')[0] : null,no_of_units:this.editdata.no_of_units
        })
      })
    }

  }
  loadMedicines(): void {
    this.medicineService.Getall().subscribe(medicines => {
      this.medicines = medicines;
    });
  }

  customerform = this.builder.group({
    id: this.builder.control(0, Validators.required),
    productName: this.builder.control('', Validators.required),
    sku: this.builder.control(0, Validators.required),
    expiry:this.builder.control('',Validators.required),
    no_of_units:this.builder.control(0,Validators.required)
  })
  // Update selected medicine
  onMedicineChange(medicineId: number): void {
    this.selectedMedicine = medicineId;
  }

  SaveInventory() {
    if (this.customerform.valid) {

      let _obj: Inventories = {
        productid: this.selectedMedicine as number,
        sku:this.customerform.value.sku as number,
        expiry:new Date(this.customerform.value.expiry as string),
        no_of_units:this.customerform.value.no_of_units as number
      }

      if (!this.isedit) {
        this.service.CreateInventory(_obj).subscribe(item => {
          this._response = item;
          if (this._response.includes('Created')) {
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
