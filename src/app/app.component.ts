import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import Encoding from 'encoding-japanese';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zenginyayoi';
  content = '';

  // ドラッグオーバー時にデフォルトの動作を無効化
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // ファイルがドロップされたときの処理
  onDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          const uint8Array = new Uint8Array(reader.result);
          
          // 文字コードを自動判別してデコード
          const detectedEncoding = Encoding.detect(uint8Array) || 'UTF8';
          this.content = Encoding.convert(uint8Array, {
            to: 'UNICODE',
            from: detectedEncoding,
            type: 'string'
          });
        }
      };

      reader.readAsArrayBuffer(file); // ArrayBufferとして読み込む
    }
  }

  // SJISでのダウンロード（元のロジック）
  download() {
    const sjis = new Uint8Array(Encoding.convert(Encoding.stringToCode(this.content), 'SJIS'));
    const data = new Blob([sjis], { type: 'text/plain;charset=shift_jis' });
    FileSaver.saveAs(data, 'text.txt');
  }
}
