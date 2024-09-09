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
import Swal from 'sweetalert2';

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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  functionedit(id: number) {
      this.router.navigateByUrl('/category/edit/' + id)
  }

  functiondelete(code: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) =>{
      if(result.isConfirmed){
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
    }) 
  }

}
