import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../_service/category.service';
import { category } from '../../_model/category.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  customerlist!: category[];
  displayedColumns: string[] = ["id", "cname","action"];
  datasource: any;
  _response:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: CategoryService, private userservice: UserService, private toastr: ToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.Loadcustomer();
  }

  Loadcustomer() {
    this.service.Getall().subscribe(item => {
      this.customerlist = item;
      console.log(item);
      this.datasource = new MatTableDataSource<category>(this.customerlist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  functionedit(id: number) {
      this.router.navigateByUrl('/category/edit/' + id)
  }

  functiondelete(code: number) {
      if (confirm('Are you sure?')) {
        this.service.Deletecategory(code).subscribe(item=>{
          this._response=item;
          if (this._response) {
            this.toastr.success('Deleted successfully', 'Success');
            this.Loadcustomer();
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }
  }

}
