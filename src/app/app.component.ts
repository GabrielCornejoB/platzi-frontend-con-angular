import { Component, inject } from '@angular/core';
import { FilesService } from './services/files/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private fileService = inject(FilesService);

  downloadPDF() {
    this.fileService
      .getFile(
        'pdf-descargado.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe((ans) => console.log(ans));
  }

  uploadFile(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService
        .uploadFile(file)
        .subscribe((ans) => console.log(ans.location));
    }
  }
}
