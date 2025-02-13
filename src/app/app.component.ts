import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import Encoding from 'encoding-japanese';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zenginyayoi';
  content = '';
  download() {
    const sjis = new Uint8Array(Encoding.convert(Encoding.stringToCode(this.content), 'SJIS'));
    const data = new Blob([sjis], { type: 'text/plain;charset=shift_jis' });
    FileSaver.saveAs(data, 'text.txt');
  }
}
