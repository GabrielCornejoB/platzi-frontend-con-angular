import { Component, OnInit, inject } from '@angular/core';
import { FilesService } from './services/files/files.service';
import { AuthService } from './services/auth/auth.service';
import { TokenService } from './services/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private fileService = inject(FilesService);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);

  public ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) this.authService.getProfile().subscribe();
  }

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
