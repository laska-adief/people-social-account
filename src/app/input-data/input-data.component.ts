import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SheetService } from '../service/sheet.service';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.scss'],
})
export class InputDataComponent implements OnInit {
  sheetForm!: FormGroup;
  action!: 'add' | 'edit';
  editDataId: number = 0;

  constructor(
    private fb: FormBuilder,
    private sheetService: SheetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initSheetForm();

    if (this.route.snapshot?.url[0]?.path === 'add') {
      this.action = 'add';
    } else {
      this.action = 'edit';
      this.route.params.subscribe((params) => (this.editDataId = params['id']));
      this.getOneDataSheet(this.editDataId);
    }
  }

  initSheetForm() {
    this.sheetForm = this.fb.group({
      name: ['', Validators.required],
      instagram: [''],
      twitter: [''],
      facebook: [''],
      linkedin: [''],
    });
  }

  getOneDataSheet(id: number) {
    this.sheetService.getDataSheetById(id).subscribe({
      next: (res) => {
        console.log('res', res);

        this.sheetForm.patchValue(res[0]);
        console.log(this.sheetForm.value);
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  onSubmit() {
    if (this.action === 'add') {
      this.addData();
    } else {
      this.editData();
    }
  }

  addData() {
    const data = this.sheetForm.value;
    this.sheetService.createSheet(data).subscribe({
      next: (res) => {
        console.log('res', res);
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Data Added',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        }
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  editData() {
    const data = this.sheetForm.value;
    this.sheetService.updateDataSheet(this.editDataId, data).subscribe({
      next: (res) => {
        console.log('res', res);
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Data Updated',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        }
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }
}
