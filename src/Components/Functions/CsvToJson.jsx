import { ConversionDict } from '../Data/ConversionDict';
import { ReviseJson } from './ReviseJson';

export const CsvToJson = (csv) => {
    const linestest = csv.split(/\n/);
    const result_ = [];
    const conversion_dict = ConversionDict();

    sessionStorage.setItem('original_csv',JSON.stringify(linestest)) //自然科学の分類を確認する用 Upload()でgithubにあげてもらう
    for (let i = 1; i < linestest.length; i++){
        const obj = {};
        const currentline = linestest[i].split(/,/);
        
        let a = String(currentline).replace(/\r/g, 'idk').split(','); //この辺の処理必要かどうかわからんけど残しておく。
        let b = [];
        for (let j = 1; j < a.length; j++) {
            if (a[j] !== 'idk'){ 
                b.push(currentline[j]);
            }
        }

        obj["class"] = currentline[0];
        obj["null"] = b;
        result_.push(obj);
    }

    //科目名適応
    for (let i = 0; i < result_.length; i++){
        //result[i]['null'].pop();
        for (let j = 0; j < result_[i]["null"].length; j++){
            for (let k in conversion_dict) {
                if (result_[i]['null'][j].includes(k)) {
                    result_[i]['null'][j] = " " + conversion_dict[k];
                    break;
                } else{
                    let rep = result_[i]['null'][j]
                    result_[i]['null'][j] = rep.replace('"', '');
                }
            }
        }
    }

    var dayCheck = result_[0]["null"];
    var checkedFlag = [];
    var isIN = [];
    const days = ["月","火","水","木","金"];

    for(let i = 0; i < dayCheck.length; i++){
        for(let j = 0; j < 5; j++){
            if(dayCheck[i].includes(days[j])){
                checkedFlag.push([days[j],i]);
                isIN.push(days[j]);
            }
        }
    }

    const result = ReviseJson(result_);
    
    let cnt = 0;
    const checkDay = (day,place) => {
        if(checkedFlag[place][0]!==day){
            checkedFlag.splice(place,0,[day,place*6]);
            checkedFlag = checkedFlag.map((d,index) => 
                index > place ? [d[0],d[1] + 6]: d
            );
            addDay(day,checkedFlag[place][1]);
        } 
        if(place+1 < checkedFlag.length){
            cnt++;
            if(cnt > 4) cnt = 0;
            checkDay(days[cnt],place+1);
        } else {
            if (days[cnt+1] === "金") {
                addFriday();
            }
        }
    }

    const addDay = (day,place) => { 
        result[0]["null"].splice(place,0," "," "," "," "," ");
        result[0]["null"].splice(place,0,day);
        for(let i = 1; i < 7; i++) result[1]["null"].splice(place,0,String(7-i));
        for(let i = 2; i < 20; i++) result[i]["null"].splice(place,0," "," "," "," "," "," ");
    }

    const addFriday = () => {
        if(result[0]["null"].slice(-1)[0] === '\r') result[0]["null"].pop();
        if(result[1]["null"].slice(-1)[0] === '\r') result[1]["null"].pop();
        result[0]["null"].push("金");
        for(let i = 0; i < 5; i++){
            result[0]["null"].push(" ");
        }
        for(let i = 1; i < 7; i++){
            result[1]["null"].push(String(i));
        }
        for(let i = 2; i < 20; i++) {
            if(result[i]["null"].slice(-1)[0] === '\r') result[i]["null"].pop();
            for(let j = 0; j < 6; j++){
                result[i]["null"].push(" ");
            }
        }
    }

    //console.log(result)
    checkDay("月",0);
    return result;
}