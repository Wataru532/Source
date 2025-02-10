import { GuestHeader } from "../guest_Header/guest_Header"
import styles from '../../Home/home.module.css'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { isSmartPhone } from "../../Header/Header"


const now = new Date();
const year = now.getYear();
const month = now.getMonth();
const date = now.getDate();
const day = now.getDay();
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const weeks = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var a = 0;
var b = 0;
const dates = year%4===0 &&!(year%100===0 && year%400!==0)
? [31,29,31,30,31,30,31,31,30,31,30,31]
: [31,28,31,30,31,30,31,31,30,31,30,31]

const classroom_name = [
                    "3-1","3-2","3-3","3-4","3年理探","3年国探",
                    "2-1","2-2","2-3","2-4","2年理探","2年国探",
                    "1-1","1-2","1-3","1-4","1-5","1-6"
                ]

const subj_col_class = {
    " 現国":"td_ja", " 言文":"td_ja", " 論国":"td_ja", " 漢文":"td_ja", " 古文":"td_ja", " 古漢":"td_ja", " 古典":"td_ja", //国語
    " 実数A":"td_math", " 実数B":"td_math", " 応数":"td_math", " 理数Ⅱα":"td_math"," 理数E":"td_math"," 数Ⅱ":"td_math"," 数B":"td_math"," 数BC":"td_math"," ⅢC":"td_math", //数学
    " 数ⅡⅢ":"td_math", " 理数Ⅱβ":"td_math"," 数Ⅰ":"td_math"," 数A":"td_math", " 理数Ⅰ":"td_math"," 数Ⅲ":"td_math", " 理数Ⅱ":"td_math",' 数ＢC':'td_math',' 理数Ⅰα':'td_math',
    ' 理数Ⅰβ':'td_math',' 数ⅢC':'td_math',
    " 総英":"td_en"," EC":"td_en"," DDI":"td_en", //英語
    " EW":"td_en"," 論表":"td_en",' 総英ⅡⅢ':'td_en',' 総英ⅠⅡ':'td_en',' 総英Ⅲ':'td_en',
    " 歴史":"td_soci"," 地理":"td_soci"," 世史":"td_soci"," 日史":"td_soci"," 政経":"td_soci", " 歴史β":"td_soci"," 地理β":"td_soci"," 公共":"td_soci", //社会
    " 物理":"td_sci", " 物基":"td_sci", " 理物":"td_sci", " 生物":"td_sci", " 生基":"td_sci", " 理生":"td_sci", " 化学":"td_sci", " 化基":"td_sci", " 理化":"td_sci"," 自α":"td_sci", " 自β":"td_sci"," 自科":"td_sci",//理科
    " 家":"td_homE", " 情報Ⅰ":"td_info", " 保":"td_pe", " 体理":"td_pe"," 体":"td_pe", " 音楽":"td_art", " 美術":"td_art", " 書道":"td_art", " ":"td_none"//その他
    }

function showDay() {
    return (weeks[day] + " " + months[month] + "/" + date + " " + now.getFullYear());
}

var res = 0;
var resn = 0;
function day_process(){
    if (year%4===0 && !(year%100===0 && year%400!==0)) {
        var dates = [31,29,31,30,31,30,31,31,30,31,30,31];
    } else{
        var dates = [31,28,31,30,31,30,31,31,30,31,30,31];
    }

    //Monday
    if (date-day+1 > dates[month]){
        var mon_date = date-day+1 - dates[month];
    } else if (date-day+1 <= 0){
        var mon_date = dates[month-1] + date-day+1;
    }else{
        var mon_date = date - day + 1;
    }

    //Friday
    if (date-day+5 > dates[month]){
        var fri_date = date-day+5-dates[month];
    } else if (date-day+5 <= 0){
        var fri_date =  dates[month-1] + date-day+5;
    }else{
        var fri_date =  date - day + 5;
    }

    //Month
    if(date < 10 && mon_date > fri_date){
        var m_1 = month;
        var m_2 = month+1;
        var m_1_new = m_2;
        var m_2_new = m_2;
    }
    else if(date > 10 && mon_date > fri_date){
        var m_1 = month+1;
        var m_2 = month+2;
        var m_1_new = m_2;
        var m_2_new = m_2;
    }
    else{
        var m_1 = month+1;
        var m_2 = m_1;
        if(mon_date+7 > dates[month]){
            var m_1_new = m_1 + 1;
            var m_2_new = m_1 + 1;
        } else if(fri_date + 7 > dates[month]){
            var m_1_new = m_1;
            var m_2_new = m_1 + 1;
        } else{
            var m_1_new = m_1;
            var m_2_new = m_2;
        }
    }

    //Nextweek
    if(m_1_new < m_2_new) {
        var mon_date_new = mon_date + 7;
        var fri_date_new = mon_date + 11 - dates[m_1 - 1];
    } else if(m_1_new > m_1){
        var mon_date_new = mon_date + 7 - dates[m_1 - 1];
        var fri_date_new = mon_date_new + 4;
    } else {
        var mon_date_new = mon_date + 7;
        var fri_date_new = mon_date + 11;
    }


    res = String(m_1)+String(mon_date);
    resn = String(m_1_new) + String(mon_date_new);
}
day_process();

const Viewdata =  (thisweek) =>{
    //選択科目のデータを取得するプログラムを記述
    const Info =  JSON.parse(localStorage.getItem('Info'))
    const art =  Info.subjects.芸
    const social =  Info.subjects.日地
    const science =  Info.subjects.物生
    const politic =  Info.subjects.世政経
    const selectionData = {
        "class": (classroom_name.indexOf(Info.class)+2), //12 as 2年理探
        "subjects":{" 芸":art, " 理物生":science, " 物生":science, " 日地":social," 地歴β":social," 世政経":politic}
    }
    const data_none = [" "," "," "," "," "," ",
        " "," ","データ"," "," "," ",
        " "," ","入力"," "," "," ",
        " "," ","待ち"," "," "," ",
        " "," "," "," "," "," ",
    ]
    //json data
    if(thisweek){
        fetch(`https://wataru532.github.io/Scheduler_data/scheduler_data${res}.json`)
        .then(function(response){
                if (!response.ok) {
                    for(let i = 0; i < 30; i++){
                        let targetid = document.getElementById(String(i));
                        targetid.innerHTML = data_none[i];
                        targetid.className = "td_none";
                        targetid.style.border='0px'
                        targetid.style.backgroundColor='#ffffff'
                        targetid.style.boxShadow='0px 0px 0px 0px'
                    }
                //throw new Error('Failed to load JSON file: ' + response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            const jsonData = data;
            const classData = jsonData[selectionData["class"]]["null"]; 
            
            for (let i = 0; i < 30; i++){ //選択教科表示、背景色変更
                let d = classData[i]
                if (d === " 芸" || d === " 物生" || d === " 理物生" || d === " 日地" || d === " 地歴β" || d === " 世政経"){ //選択科目用
                    classData[i] = selectionData["subjects"][d]; 
                } 
                d = classData[i] //更新しなきゃいけないの忘れてた
                
                document.getElementById(String(i)).innerHTML = d; //データセット
                let targetid = document.getElementById(String(i));
                if (targetid){                                    //背景色変更用
                    let subj_col = subj_col_class[d];
                    if (d===" "){
                        targetid.style.border='0px'
                        targetid.style.boxShadow='0px 0px 0px 0px'
                        targetid.style.backgroundColor='#ffffff'
                    }else if (!subj_col){
                        targetid.style.backgroundColor='#ffffff'
                        targetid.style.boxShadow = 'inset -2px -2px 0px 2px rgba(0, 0, 0, .1)';
                        targetid.style.border='1px whitesmoke solid'
                    }else{
                        targetid.style.backgroundColor = Info.subj_col[subj_col];
                        targetid.style.boxShadow = 'inset -2px -2px 0px 2px rgba(0, 0, 0, .1)';
                        targetid.style.border='1px whitesmoke solid'
                    }    
                }
            }
        })
        .catch(function(error) {
            console.error('Error fetching JSON file: ', error);
        });
    }else{  
        fetch(`https://wataru532.github.io/Scheduler_data/scheduler_data${resn}.json`)
        .then(function(response){
                if (!response.ok) {
                    for(let i = 0; i < 30; i++){
                        let targetid = document.getElementById(String(i));
                        targetid.innerHTML = data_none[i];
                        targetid.className = "td_none";
                        targetid.style.border='0px'
                        targetid.style.backgroundColor='#ffffff'
                        targetid.style.boxShadow='0px 0px 0px 0px'
                    }
                //throw new Error('Failed to load JSON file: ' + response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            const jsonData = data;
            const classData = jsonData[selectionData["class"]]["null"]; 
            
            for (let i = 0; i < 30; i++){ //選択教科表示、背景色変更
                let d = classData[i]
                if (d === " 芸" || d === " 物生" || d === " 理物生" || d === " 日地" || d === " 地歴β" || d === " 世政経"){ //選択科目用
                    classData[i] = selectionData["subjects"][d]; 
                } 
                d = classData[i] //更新しなきゃいけないの忘れてた
                
                document.getElementById(String(i)).innerHTML = d; //データセット
                let targetid = document.getElementById(String(i));
                if (targetid){                                    //背景色変更用
                    let subj_col = subj_col_class[d];
                    if (d===" "){
                        targetid.style.border='0px'
                        targetid.style.boxShadow='0px 0px 0px 0px'
                        targetid.style.backgroundColor='#ffffff'
                    }else if (!subj_col){
                        targetid.style.backgroundColor='#ffffff'
                        targetid.style.boxShadow = 'inset -2px -2px 0px 2px rgba(0, 0, 0, .1)';
                        targetid.style.border='1px whitesmoke solid'
                    }else{
                        targetid.style.backgroundColor = Info.subj_col[subj_col];
                        targetid.style.boxShadow = 'inset -2px -2px 0px 2px rgba(0, 0, 0, .1)';
                        targetid.style.border='1px whitesmoke solid'
                    }    
                }
            }
        })
        .catch(function(error) {
            console.error('Error fetching JSON file: ', error);
        });
    }
        

}

export const HelpMenu = (props) =>{
    const {open,setOpen} = props
    
    return(
        <div id='help'>
        <div align="left"><button className={styles.circlebutton} onClick={()=>{setOpen(!open)}} id='btn'>?</button></div>
        {open ? (
        <div className={styles.menu} id="menu">
            <ul className={styles.helpmenu} >
                <a href="https://forms.gle/9ExuRPUDyRMcMxxp8" target="_blank" className={styles.helpmenu} rel="noopener noreferrer">
                    <li>フィードバックを送信</li></a>
                <Link to='/Guest_Usage' className={styles.helpmenu}  rel="noopener noreferrer">
                    <li>使い方</li></Link>
                <a href="https://wataru532.github.io/Scheduler/" className={styles.helpmenu}>
                    <li>About Scheduler</li></a>
                <Link to='/Guest_UpdateLog' className={styles.helpmenu}  rel="noopener noreferrer">
                    <li>Update Log</li></Link>
            </ul>
        </div>
        ):(
            ""
        )}
        </div>
    )
}

//resizable function
/*
const resizing = () => {
    const tableContainer = document.getElementById('tableContainer');
    const resizer = document.getElementById('bottomRightResizer');
    if (!tableContainer){return false;}
    if (!resizer){return false;}

    let startX, startY, startWidth, startHeight;

    function initResize(g) {
        startX = g.type === 'touchstart' ? g.touches[0].clientX : g.clientX;
        startY = g.type === 'touchstart' ? g.touches[0].clientY : g.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(tableContainer).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(tableContainer).height, 10);
        document.documentElement.addEventListener(g.type === 'touchstart' ? 'touchmove' : 'mousemove', doDrag, false);
        document.documentElement.addEventListener(g.type === 'touchstart' ? 'touchend' : 'mouseup', stopDrag, false);
    }

    function doDrag(g) {
        const clientX = g.type === 'touchmove' ? g.touches[0].clientX : g.clientX;
        const clientY = g.type === 'touchmove' ? g.touches[0].clientY : g.clientY;
        let newWidth = startWidth + clientX - startX;
        let newHeight = startHeight + clientY - startY;
        console.log(newWidth,newHeight);
        if (newWidth < 220) newWidth = 220;
        if (newHeight < 460) newHeight = 460;
        tableContainer.style.width = (newWidth) + 'px';
        tableContainer.style.height = (newHeight) + 'px';
    }

    function stopDrag(g) {
        document.documentElement.removeEventListener(g.type === 'touchend' ? 'touchmove' : 'mousemove', doDrag, false);
        document.documentElement.removeEventListener(g.type === 'touchend' ? 'touchend' : 'mouseup', stopDrag, false);
    }

    resizer.addEventListener('mousedown', initResize, false);
    resizer.addEventListener('touchstart', initResize, false);

    let isDragging = false;
    let offsetX, offsetY;

    function initDrag(g) {
        if (g.target !== resizer) {
            isDragging = true;
            offsetX = g.type === 'touchstart' ? g.touches[0].clientX - tableContainer.getBoundingClientRect().left : g.clientX - tableContainer.getBoundingClientRect().left;
            offsetY = g.type === 'touchstart' ? g.touches[0].clientY - tableContainer.getBoundingClientRect().top : g.clientY - tableContainer.getBoundingClientRect().top;
            document.documentElement.addEventListener(g.type === 'touchstart' ? 'touchmove' : 'mousemove', doMove, false);
            document.documentElement.addEventListener(g.type === 'touchstart' ? 'touchend' : 'mouseup', stopMove, false);
        }
    }

    function doMove(g) {
        if (isDragging) {
            const clientX = g.type === 'touchmove' ? g.touches[0].clientX : g.clientX;
            const clientY = g.type === 'touchmove' ? g.touches[0].clientY : g.clientY;
            tableContainer.style.left = (clientX - offsetX) + 'px';
            tableContainer.style.top = (clientY - offsetY) + 'px';
        }
    }

    function stopMove(g) {
        isDragging = false;
        document.documentElement.removeEventListener(g.type === 'touchend' ? 'touchmove' : 'mousemove', doMove, false);
        document.documentElement.removeEventListener(g.type === 'touchend' ? 'touchend' : 'mouseup', stopMove, false);
    }

    tableContainer.addEventListener('mousedown', initDrag, false);
    tableContainer.addEventListener('touchstart', initDrag, false);
}
*/


export const GuestHome = () =>{
    const [thisweek,setWeek]=useState(true)
    function showd_Mon(thisweek){
        let plus;
        if (thisweek===true){
            plus = 0;
        } else {
            plus = 7;
        }
        if (date-day+1+plus > dates[month]){
            a = date-day+1 - dates[month];
        } else if (date-day+1+plus <= 0){
            a = dates[month-1] + date-day+1;
        }else{
            a = date - day + 1;
        }
        return a + plus;
    }
    
    function showd_Tue(thisweek){
        let plus;
        if (thisweek===true){
            plus = 0;
        } else {
            plus = 7;
        }
        if (date-day+2+plus> dates[month]){
            return date-day+2-dates[month]+plus;
        }else if (date-day+2+plus <= 0){
            return dates[month-1] + date-day+2+plus;
        } else{
            return date - day + 2+plus;
        }
    }
    
    function showd_Wed(thisweek){
        let plus;
        if (thisweek===true){
            plus = 0;
        } else {
            plus = 7;
        }
        if (date-day+3+plus > dates[month]){
            return date-day+3-dates[month]+plus;
        }else if (date-day+3+plus <= 0){
            return dates[month-1] + date-day+3+plus;
        } else{
            return date - day + 3+plus;
        }
    }
    
    function showd_Thu(thisweek){
        let plus;
        if (thisweek===true){
            plus = 0;
        } else {
            plus = 7;
        }
        if (date-day+4+plus > dates[month]){
            return date-day+4-dates[month]+plus;
        }else if (date-day+4+plus <= 0){
            return dates[month-1] + date-day+4+plus;
        } else{
            return date - day + 4+plus;
        }
    }
    
    function showd_Fri(thisweek){
        let plus;
        if (thisweek===true){
            plus = 0;
        } else {
            plus = 7;
        }
        if (date-day+5+plus > dates[month]){
            b = date-day+5-dates[month]+plus;
        } else if (date-day+5+plus <= 0){
            b =  dates[month-1] + date-day+5+plus;
        }else{
            b =  date - day + 5+plus;
        }
        return b;
    }
    
    function month_Now(thisweek){
        const Mon_date = ()=>{
            if (date-day+1 > dates[month]){
                return date-day+1 - dates[month];
            } else if (date-day+1 <= 0){
                return dates[month-1] + date-day+1;
            }else{
                return date - day + 1;
            }
        }
        const Fri_date= ()=>{
            if (date-day+5 > dates[month]){
                return date-day+5-dates[month];
            } else if (date-day+5 <= 0){
                return  dates[month-1] + date-day+5;
            }else{
                return  date - day + 5;
            }
        }

        const mon_date=Mon_date()
        const fri_date=Fri_date()

        if(date < 10 && mon_date > fri_date){
            var m_1 = month;
            var m_2 = month+1;
            var m_1_new = m_2;
            var m_2_new = m_2;
        }
        else if(date > 10 && mon_date > fri_date){
            var m_1 = month+1;
            var m_2 = month+2;
            var m_1_new = m_2;
            var m_2_new = m_2;
        }
        else{
            var m_1 = month+1;
            var m_2 = m_1;
            if(mon_date+7 > dates[month]){
                var m_1_new = m_1 + 1;
                var m_2_new = m_1 + 1;
            } else if(fri_date + 7 > dates[month]){
                var m_1_new = m_1;
                var m_2_new = m_1 + 1;
            } else{
                var m_1_new = m_1;
                var m_2_new = m_2;
            }
        }
        if(thisweek){
            if(m_1===m_2){
                return(`${months[m_1-1]}`)
            }else{
                return(`${months[m_1-1]}/${months[m_2-1]}`)
            }
        }else{
            if(m_1_new===m_2_new){
                return(`${months[m_1_new-1]}`)
            }else{
                return(`${months[m_1_new-1]}/${months[m_2_new-1]}`)
            }
        }
    }
    //Auth代わりにlocalstorage管理
    if(!(localStorage.getItem('Info'))){
        localStorage.setItem('Info',
            JSON.stringify({
                'class': null,
                'subjects':{'芸':null,'物生':null,'日地':null,'世政経':null,},
                "subj_col":{"td_ja":"#ff3e3e9c", "td_math":"#2c68ff9c", "td_en":"#ffe8379c", "td_sci":"#4e963d9c", "td_soci":"#ff9a479c", "td_homE":"#9863be9c", "td_info":"#63b6b79c", "td_pe":"#ffd6aa9c", "td_art":"#ffadf49c","td_none":"#ffffff"},
                "table_prop":{"width":630, "height":430, "left":25, "top":178},
                "notes":
                    {
                        "one":{"type":"txt", "left":200, "top":200, "content":"これはテストです"},
                        "two":{"type":"cdc", "left":300, "top":200, "content":"countdowncalender"}
                    }
            })
        )
    }
    const location = useLocation()
    const navigate = useNavigate()
    if (location.state){
        navigate(location.state)
    }

    Viewdata(thisweek)

    const [open,setOpen] =useState(false)




    const Info = JSON.parse(localStorage.getItem('Info'))
    const userclass = Info.class
    const isOnline = navigator.onLine
    const toggle = isOnline ? 'toggle' : ''
    if (isSmartPhone()){
        return (
        <div onClick={(g)=>{if (g.target.id!==("btn")){setOpen(false)}}}>
            <GuestHeader />
            
            <div className={styles.body}>
                <div className={styles.info}> 
                    <p className={styles.p2}>Class : {userclass}</p><br />
                    <p className={styles.p2}>{showDay()} Displaying : {thisweek===true?'今週':'来週'}</p><br />
                    <HelpMenu  open={open} setOpen={ setOpen }/>
                    <div align="right" className={styles.version}>v2.2.0</div>
                </div>
                <div className={styles.table_container} id="tableContainer" style={{width: "100%", height: "60%", position: "absolute"}}>
                    <div className={styles.resizer} id="bottomRightResizer"></div>
                    <table align="center" border="1" >
                    <thead>
                        <tr>
                            <th><button onClick={()=>{setWeek(!thisweek)}} className={styles.toggle_button}>{toggle}</button></th>
                            <th className= {day===1 && thisweek ? styles.today : styles.not_today}>Mon</th>
                            <th className= {day===2 && thisweek ? styles.today : styles.not_today}>Tue</th>
                            <th className= {day===3 && thisweek ? styles.today : styles.not_today}>Wed</th>
                            <th className= {day===4 && thisweek ? styles.today : styles.not_today}>Thu</th>
                            <th className= {day===5 && thisweek ? styles.today : styles.not_today}>Fri</th>
                        </tr>
                        <tr>
                            <th>{month_Now(thisweek)}</th>
                            <th className= {day===1 && thisweek ? styles.today : styles.not_today}>{showd_Mon(thisweek)}</th>
                            <th className= {day===2 && thisweek ? styles.today : styles.not_today}>{showd_Tue(thisweek)}</th>
                            <th className= {day===3 && thisweek ? styles.today : styles.not_today}>{showd_Wed(thisweek)}</th>
                            <th className= {day===4 && thisweek ? styles.today : styles.not_today}>{showd_Thu(thisweek)}</th>
                            <th className= {day===5 && thisweek ? styles.today : styles.not_today}>{showd_Fri(thisweek)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="tn">1</td><td className="htdata" id="0"></td><td className="htdata" id="6"></td><td className="htdata" id="12"></td><td className="htdata" id="18"></td><td className="htdata" id="24"></td></tr>
                        <tr><td className="tn">2</td><td className="htdata" id="1"></td><td className="htdata" id="7"></td><td className="htdata" id="13"></td><td className="htdata" id="19"></td><td className="htdata" id="25"></td></tr>
                        <tr><td className="tn">3</td><td className="htdata" id="2"></td><td className="htdata" id="8"></td><td className="htdata" id="14"></td><td className="htdata" id="20"></td><td className="htdata" id="26"></td></tr>
                        <tr><td className="tn">4</td><td className="htdata" id="3"></td><td className="htdata" id="9"></td><td className="htdata" id="15"></td><td className="htdata" id="21"></td><td className="htdata" id="27"></td></tr>
                        <tr><td className="tn">5</td><td className="htdata" id="4"></td><td className="htdata" id="10"></td><td className="htdata" id="16"></td><td className="htdata" id="22"></td><td className="htdata" id="28"></td></tr>
                        <tr><td className="tn">6</td><td className="htdata" id="5"></td><td className="htdata" id="11"></td><td className="htdata" id="17"></td><td className="htdata" id="23"></td><td className="htdata" id="29"></td></tr>
                    </tbody>
                    </table><br />
                </div>
            </div>
        </div>
    )
}else{
    return (
        <div onClick={(g)=>{if (g.target.id!==("btn")){setOpen(false)}}}>
            <GuestHeader />
            
            <div className={styles.body}>
                <div className={styles.info}> 
                    <p className={styles.p2}>Class : {userclass}</p><br />
                    <p className={styles.p2}>{showDay()} Displaying : {thisweek===true?'今週':'来週'}</p><br />
                    <HelpMenu  open={open} setOpen={setOpen}/>
                    <div align="right" className={styles.version}>v2.2.0</div>
                </div>
                <div className={styles.table_container} id="tableContainer" style={{width: "70%", height: "60%", left: "15%"}}>
                    <div className={styles.resizer} id="bottomRightResizer"></div>
                    <table align="center" border="1" >
                    <thead>
                        <tr>
                            <th><button onClick={()=>{setWeek(!thisweek)}} className={styles.toggle_button}>{toggle}</button></th>
                            <th className= {day===1 && thisweek ? styles.today : styles.not_today}>Mon</th>
                            <th className= {day===2 && thisweek ? styles.today : styles.not_today}>Tue</th>
                            <th className= {day===3 && thisweek ? styles.today : styles.not_today}>Wed</th>
                            <th className= {day===4 && thisweek ? styles.today : styles.not_today}>Thu</th>
                            <th className= {day===5 && thisweek ? styles.today : styles.not_today}>Fri</th>
                        </tr>
                        <tr>
                            <th>{month_Now(thisweek)}</th>
                            <th className= {day===1 && thisweek ? styles.today : styles.not_today}>{showd_Mon(thisweek)}</th>
                            <th className= {day===2 && thisweek ? styles.today : styles.not_today}>{showd_Tue(thisweek)}</th>
                            <th className= {day===3 && thisweek ? styles.today : styles.not_today}>{showd_Wed(thisweek)}</th>
                            <th className= {day===4 && thisweek ? styles.today : styles.not_today}>{showd_Thu(thisweek)}</th>
                            <th className= {day===5 && thisweek ? styles.today : styles.not_today}>{showd_Fri(thisweek)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="tn">1</td><td className="htdata" id="0"></td><td className="htdata" id="6"></td><td className="htdata" id="12"></td><td className="htdata" id="18"></td><td className="htdata" id="24"></td></tr>
                        <tr><td className="tn">2</td><td className="htdata" id="1"></td><td className="htdata" id="7"></td><td className="htdata" id="13"></td><td className="htdata" id="19"></td><td className="htdata" id="25"></td></tr>
                        <tr><td className="tn">3</td><td className="htdata" id="2"></td><td className="htdata" id="8"></td><td className="htdata" id="14"></td><td className="htdata" id="20"></td><td className="htdata" id="26"></td></tr>
                        <tr><td className="tn">4</td><td className="htdata" id="3"></td><td className="htdata" id="9"></td><td className="htdata" id="15"></td><td className="htdata" id="21"></td><td className="htdata" id="27"></td></tr>
                        <tr><td className="tn">5</td><td className="htdata" id="4"></td><td className="htdata" id="10"></td><td className="htdata" id="16"></td><td className="htdata" id="22"></td><td className="htdata" id="28"></td></tr>
                        <tr><td className="tn">6</td><td className="htdata" id="5"></td><td className="htdata" id="11"></td><td className="htdata" id="17"></td><td className="htdata" id="23"></td><td className="htdata" id="29"></td></tr>
                    </tbody>
                    </table><br />
                </div>
            </div>
        </div>
    )
}
}

export default GuestHome;