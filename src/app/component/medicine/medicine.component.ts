import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { MedicineService } from '../../_service/medicine.service';
import { medicine } from '../../_model/medicine.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicine',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './medicine.component.html',
  styleUrl: './medicine.component.css'
})
export class MedicineComponent implements OnInit {

  customerlist!: medicine[];
  displayedColumns: string[] = ["id","mname","cname","mdescription","measurement","needsprescription","price","stockin","stockout","stockavailable","action"];
  datasource: any;
  _response:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: MedicineService, private userservice: UserService, private toastr: ToastrService,
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
      this.datasource = new MatTableDataSource<medicine>(this.customerlist);
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
  // Reset filter method
  resetFilter() {
    this.datasource = new MatTableDataSource<medicine>(this.customerlist);  // Reset to original list
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  filterCriticalStock() {
    const criticalStockLevel = 10;  // You can set any threshold for critical stock

    const criticalStockMedicines = this.customerlist.filter(medicine => medicine.stockin-medicine.stockout < criticalStockLevel);

    this.datasource = new MatTableDataSource<medicine>(criticalStockMedicines);
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }


  functionedit(id: number) {
      this.router.navigateByUrl('/medicine/edit/' + id)
  }

  functiondelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) =>{
      if (result.isConfirmed) {
        this.service.DeleteMedicineList(id).subscribe(item=>{
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
