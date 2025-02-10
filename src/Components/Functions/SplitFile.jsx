import { DayProcess } from "./DayProcess";

export const SplitFile = (inputjson, date_value) => {
    const e = DayProcess();
    const res = e.res;
    const resn = e.resn;
    const resnxtnxt = e.resnxtnxt;

    var filedate;
    var output = [];
    if (date_value === "thisweek") filedate = res;
    else if (date_value === "nextweek") filedate = resn;
    output.push([JSON.stringify(inputjson, null, 2), filedate]);

    if (inputjson[0]["null"].length >= 60) {
        if (date_value === "thisweek") filedate = resn;
        else if (date_value === "nextweek") filedate = resnxtnxt;
        const splited = [];
        for (let i=0; i < 20; i++) {
            splited.push({"class": i});
        }

        for(let i = 0; i < 20; i++) {
            let tentative = [];
            for(let j = 30; j < 60; j++) {
                tentative.push(inputjson[i]['null'][j]);
            }
            splited[i]['null'] = tentative;
        }

        output.push([JSON.stringify(splited, null, 2), filedate]);
    }
    if(output.length === 1) {
        return [1, output[0]]
    } else {
        return [2, output[0], output[1]]
    }
}