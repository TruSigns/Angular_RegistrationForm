import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { User } from '../models/user.models';
import { ApiService } from '../services/api.service';
import { Route, Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NumberInput } from '@angular/cdk/coercion';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent implements OnInit {
  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = [
    'lastName',
    'email',
    'mobile',
    'weight',
    'height',
    'bmi',
    'bmiResult',
    'gender',
    'trainerOptions',
    'package',
    'goals',
    'trainedBefore',
    'selectDate',
    'action',
  ];
  constructor(
    private api: ApiService,
    private router: Router,
    private confirm: NgConfirmService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getRegistrationUser().subscribe((res) => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // function that will route the user to update page once they click on the ID buttion
  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  delete(id: number) {
    this.confirm.showConfirm(
      'Are you sure you want to delete?',
      () => {
        this.api.deleteRegistrationUser(id).subscribe((res) => {
          this.toast.success({
            detail: 'user deleted',
            summary: 'Deleted',
            duration: 2000,
          });
          this.getUsers();
        });
      },
      () => {}
    );
  }
}
