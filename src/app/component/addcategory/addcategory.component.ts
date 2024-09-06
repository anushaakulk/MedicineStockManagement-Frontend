import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../_service/category.service';
import { category } from '../../_model/category.model';

@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent implements OnInit {

  _response: any;
  title = 'Add Category';
  editcode = 0;
  isedit = false;
  editdata!: category;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: CategoryService, private act: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.editcode = parseInt(this.act.snapshot.paramMap.get('id')!);
    if (this.editcode != 0 && !isNaN(this.editcode)) {
      this.isedit = true
      this.title = 'Edit Category';
      this.customerform.controls['id'].disable();
      this.service.Getbycode(this.editcode).subscribe(item => {
        this.editdata = item;
        this.customerform.setValue({
          id: this.editcode, cname: this.editdata.cname
        })
      })
    }

  }

  customerform = this.builder.group({
    id: this.builder.control(0, Validators.required),
    cname: this.builder.control('', Validators.required),
    // email: this.builder.control('', Validators.required),
    // phone: this.builder.control('', Validators.required),
    // creditlimit: this.builder.control(0, Validators.required),
    // status: this.builder.control(true)
  })

  Savecustomer() {
    if (this.customerform.valid) {

      let _obj: category = {
        cname: this.customerform.value.cname as string
      }

      if (!this.isedit) {
        this.service.Createcategory(_obj).subscribe(item => {
          this._response = item;
          if (this._response.includes('Category')) {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/category');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.id=this.editcode;
        this.service.Updatecategory(_obj).subscribe(item => {
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
