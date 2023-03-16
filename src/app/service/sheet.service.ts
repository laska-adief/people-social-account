import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sheet } from '../models/sheet.model';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  constructor(private http: HttpClient) {}

  readonly SHEETURL = environment.CONNECTION_URL;

  getAllDataSheet() {
    return this.http.get<Sheet[]>(this.SHEETURL);
  }

  getDataSheetById(id: number) {
    return this.http.get<Sheet[]>(this.SHEETURL + '/' + id);
  }

  createSheet(data: Sheet): Observable<Sheet> {
    return this.http.post<Sheet>(this.SHEETURL, data);
  }

  updateDataSheet(id: number, data: Sheet) {
    return this.http.patch(this.SHEETURL + '/' + id, data);
  }

  deleteDataSheet(id: number) {
    return this.http.delete(this.SHEETURL + '/' + id);
  }
}
