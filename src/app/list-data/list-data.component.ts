import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sheet } from '../models/sheet.model';
import { SheetService } from '../service/sheet.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
})
export class ListDataComponent implements OnInit {
  dataSheet: Sheet[] = [];

  constructor(private router: Router, private sheetService: SheetService) {}

  ngOnInit(): void {
    this.getAllDataSheet();
  }

  addData() {
    this.router.navigate(['/add']);
  }

  getAllDataSheet() {
    this.sheetService.getAllDataSheet().subscribe({
      next: (res) => {
        console.log('data', res);
        if (res?.length) {
          this.dataSheet = res;
        }
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  editSheetData(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteSheetData(id: number, name: string) {
    Swal.fire({
      icon: 'question',
      title: `Delete data ${name} ?`,
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
        this.sheetService.deleteDataSheet(id).subscribe({
          next: (res) => {
            console.log('data deleted', res);
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Data Deleted',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.value) {
                  this.getAllDataSheet();
                }
              });
            }
          },
          error: (err) => {
            console.log('error', err);
          },
        });
      }
    });
  }
}
