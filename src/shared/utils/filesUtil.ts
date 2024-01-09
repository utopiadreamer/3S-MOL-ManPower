/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from 'file-saver';

export class FilesUtil {
    
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


}