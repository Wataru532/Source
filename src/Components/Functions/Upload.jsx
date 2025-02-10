import chardet from 'chardet';
import { CsvToJson } from './CsvToJson';
import { SplitFile } from './SplitFile';
import { UploadJson } from './UploadJson';
import { UploadCsv } from './UploadCsv';


export const Upload = (gotfile) => {
    const file = document.getElementById('csvFile').files[0] ? document.getElementById('csvFile').files[0] : gotfile;

    var flag = false;
    var date_value;
    if(document.week.weekselect[0].checked){
        flag = true;
        date_value = document.week.weekselect[0].value;
    } 
    else if (document.week.weekselect[1].checked){
        flag = true;
        date_value = document.week.weekselect[1].value;
    }

    if (!flag){
        alert("適するデータの週を選択してください");
        return;
    }

    if(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target.result;

            //ファイルのエンコーディングを推定
            const uint8Array = new Uint8Array(arrayBuffer);
            const detectedEncoding = chardet.detect(uint8Array);
            const textDecoder = new TextDecoder(detectedEncoding || 'utf-8', {fatal: true});

            //ファイルをデコード
            const decodedFile = textDecoder.decode(uint8Array);

            //JSONに変換し、体裁を整える処理
            const json = SplitFile(CsvToJson(decodedFile),date_value);

            const json_week1 = json[1];
            const json_week2 = json[0] === 2 ? json[2] : null;

            UploadCsv(decodedFile);
            UploadJson(json_week1,json_week2,1);
            
        }
        reader.readAsArrayBuffer(file)


    } else {
        alert("ファイルを選択またはドロップしてください");
    }
}
