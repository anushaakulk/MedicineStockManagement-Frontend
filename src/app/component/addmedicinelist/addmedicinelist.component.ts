import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { category } from '../../_model/category.model';
import { MedicineService } from '../../_service/medicine.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { medicine } from '../../_model/medicine.model';
import { CategoryService } from '../../_service/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addmedicinelist',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './addmedicinelist.component.html',
  styleUrl: './addmedicinelist.component.css'
})
export class AddmedicinelistComponent implements OnInit{
  _response: any;
  title = 'Add Medicine';
  editcode = 0;
  isedit = false;
  editdata!: medicine;
  categories: category[] = [];
  selectedCategory!: number;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: MedicineService, private act: ActivatedRoute, private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.loadCategories();
    this.editcode = parseInt(this.act.snapshot.paramMap.get('id')!);
    if (this.editcode != 0 && !isNaN(this.editcode)) {
      this.isedit = true
      this.title = 'Edit Medicine';
      this.customerform.controls['id'].disable();
      this.service.Getbycode(this.editcode).subscribe(item => {
        this.editdata = item;
        this.customerform.setValue({
          id: this.editcode, mname: this.editdata.mname,cname:"",mdescription:this.editdata.mdescription,
          measurement:this.editdata.measurement,needsprescription:this.editdata.needsprescription,
          price:this.editdata.price,stockin:this.editdata.stockin,stockout:this.editdata.stockout
        })
      })
    }

  }
  loadCategories(): void {
    this.categoryService.Getall().subscribe(categories => {
      this.categories = categories;
    });
  }

  customerform = this.builder.group({
    id: this.builder.control(0, Validators.required),
    mname:this.builder.control('',Validators.required),
    cname:this.builder.control('',Validators.required),
    mdescription: this.builder.control('',Validators.required),
    measurement: this.builder.control(0,Validators.required),
    needsprescription: this.builder.control(true,Validators.required),
    price: this.builder.control(0,Validators.required),
    stockin: this.builder.control(0,Validators.required),
    stockout: this.builder.control(0,Validators.required),
  })
  // Update selected category
  onCategoryChange(categoryId: number): void {
    this.selectedCategory = categoryId;
  }

  SaveMedicineList() {
    if (this.customerform.valid) {

      let _obj: medicine = {
        mname:this.customerform.value.mname as string,
    category:this.selectedCategory as number,
    mdescription: this.customerform.value.mdescription as string,
    measurement: this.customerform.value.measurement as number,
    needsprescription: this.customerform.value.needsprescription as boolean,
    price: this.customerform.value.price as number,
    stockin: this.customerform.value.stockin as number,
    stockout: this.customerform.value.stockout as number
      }

      if (!this.isedit) {
        this.service.CreateMedicineList(_obj).subscribe(item => {
          this._response = item;
          if (this._response.includes('Created')) {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/medicine');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.id=this.editcode;
        this.service.UpdateMedicineList(_obj).subscribe(item => {
          this._response = item;
          if (this._response) {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/medicine');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }


    }
  }
}
