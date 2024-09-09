import { Component, ViewChild } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SalesService } from '../../_service/sales.service';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { sales } from '../../_model/sales.model';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  customerlist!: sales[];
  displayedColumns: string[] = ["id","sdate","refid","supplierId","action"];
  datasource: any;
  _response:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: SalesService, private userservice: UserService, private toastr: ToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.Loadcustomer();
  }

  
  Loadcustomer() {
    this.service.Getall().subscribe(item => {
      this.customerlist = item;
      console.log(item);
      console.log(this.customerlist);
      this.datasource = new MatTableDataSource<sales>(this.customerlist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  functionedit(code: number) {
      this.router.navigateByUrl('/Sales/edit/' + code)
  }

  functiondelete(code: number) {
      if (confirm('Are you sure?')) {
        this.service.DeleteSales(code).subscribe(item=>{
          this._response=item;
          if (this._response.result === 'pass') {
            this.toastr.success('Deleted successfully', 'Success');
            this.Loadcustomer();
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }
  }
}
