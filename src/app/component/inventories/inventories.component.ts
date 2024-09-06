import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InventoriesService } from '../../_service/inventories.service';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MaterialModule } from '../../material.module';
import { inventories } from '../../_model/inventories.model';

@Component({
  selector: 'app-inventories',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './inventories.component.html',
  styleUrl: './inventories.component.css'
})

export class InventoriesComponent {
  customerlist!: inventories[];
  displayedColumns: string[] = ["id","productName","expiry","units","action"];
  datasource: any;
  _response:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: InventoriesService, private userservice: UserService, private toastr: ToastrService,
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
      this.datasource = new MatTableDataSource<inventories>(this.customerlist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  functionedit(code: string) {
      this.router.navigateByUrl('/customer/edit/' + code)
  }

  functiondelete(code: string) {
      if (confirm('Are you sure?')) {
        this.service.Deletecustomer(code).subscribe(item=>{
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
