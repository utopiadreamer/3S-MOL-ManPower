/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from 'file-saver';

export class FilesUtil {
    
  public static async ReadFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

    public static ExportFile(
        excelUrl: string,
        contentType: string,
        fileName: string
    ) {
        const oReq = new XMLHttpRequest();
        oReq.open('get', excelUrl, true);
        oReq.responseType = 'blob';
        oReq.onload = () => {
            const blobContent = oReq.response;
            const blob = new Blob([blobContent], { type: contentType });
            saveAs(blob, fileName);
        };
        oReq.send(null);
    }

    
    public static DownloadFile = (
        fileContent: any,
        fileType: string,
        fileName: string
    ) => {
        const link = document.createElement('a');
        link.download = fileName;
        link.target = '_blank';
        const blob = new Blob([fileContent], { type: fileType });
        const url = URL.createObjectURL(blob);
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    public static FileSizeToString(bytes: number): string {
        const Kilo = 1024;
      
        if (Math.abs(bytes) < Kilo) {
          return `${bytes} Bytes`;
        }
        const units = ['kB', 'MB', 'GB', 'TB'];
        let u = -1;
        let byteValue = bytes;
        do {
          byteValue /= Kilo;
          u += 1;
        } while (
          Math.round(Math.abs(byteValue) * 10) / 10 >= Kilo &&
          u < units.length - 1
        );
      
        return `${byteValue.toFixed(1)} ${units[u]}`;
      }
      
}