import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.API_URL}/api/v1/files`;

export interface File {
  originalName: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private http = inject(HttpClient);

  constructor() {}

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((data) => {
        const blob = new Blob([data], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${API_URL}/upload`, dto);
  }
}
