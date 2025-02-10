export const ReviseJson = (inputjson) => {
    const size = inputjson[0]["null"].length;
    const insert = [];
    for(let j = 0; j < size; j++) insert.push(" ");
    
    if(inputjson.length < 20) {
        for(let i = 0; i < 6; i++) {
            inputjson.splice(2,0,{"class":i, "null":[...insert]}); //リストを入れると同じものとみなされてる？
        }
    }

    return inputjson;
}