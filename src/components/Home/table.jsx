import styles from './home.module.css';
import { isSmartPhone } from "../Header/Header";
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import uniform_img from '../../images/uniform_img.png'
import { SubjectData } from '../data/SubjectData';

export const Uni_img = () => {
    const [isMsgShown, setIsMsgShown] = useState(false);
    return (
        <div>
            <img 
                src={uniform_img} 
                className={styles.uni_img}
                onMouseEnter={()=>setIsMsgShown(true)}
                onMouseLeave={()=>setIsMsgShown(false)}
                alt=''
            />
            <span className={`${styles.uni_msg} ${isMsgShown ? styles.shown : ''}`}>基準服登校日です</span>
        </div>

    )
}

export const Table = ({setIsLeft,isLeft})=>{
    const now = new Date();
    const year = now.getYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dates = year%4===0 &&!(year%100===0 && year%400!==0)
    ? [31,29,31,30,31,30,31,31,30,31,30,31]
    : [31,28,31,30,31,30,31,31,30,31,30,31]
    var a=0
    var b=0

    const navigate = useNavigate()
    const [u_days,setInfo] = useState(null)
    useEffect(() => {
        // ローカルストレージから Info を取得
        const storedInfo = JSON.parse(sessionStorage.getItem('Assignments_Save'));
        setInfo(storedInfo);
    
        // Info が null の場合に画面遷移
        if (!storedInfo) {
          navigate("/");
        }
        
    }, [navigate]);
    const dictionary ={
        '一年':['1-1','1-2','1-3','1-4','1-5','1-6'],
        '二年':['2-1','2-2','2-3','2-4','2年理探','2年国探'],
        '三年':['3-1','3-2','3-3','3-4','3年理探','3年国探'],

    }
    if(!u_days){
        return;
    }

    
    const uniform_days = u_days['uniform'].map((item) => {

        if (item.target === '全校') {
          return Number(String(item.date).slice(4, 8)); // MMDD の数値を返す
        } else if (dictionary[item.target].includes(SubjectData().yourclass)){
          return Number(String(item.date).slice(4, 8));
        }else{
            return null;
        }
      }).filter(Boolean); // null を削除する（オプション）

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
            a = dates[month === 0 ? 11 : month-1] + date-day+1;
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
            return dates[month === 0 ? 11 : month-1] + date-day+2+plus;
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
            return dates[month === 0 ? 11 : month-1] + date-day+3+plus;
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
            return dates[month === 0 ? 11 : month-1] + date-day+4+plus;
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
            b =  dates[month === 0 ? 11 : month-1] + date-day+5+plus;
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
                return dates[month === 0 ? 11 : month-1] + date-day+1;
            }else{
                return date - day + 1;
            }
        }
        const Fri_date= ()=>{
            if (date-day+5 > dates[month]){
                return date-day+5-dates[month];
            } else if (date-day+5 <= 0){
                return  dates[month === 0 ? 11 : month-1] + date-day+5;
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
        
        if(m_1 > 12) m_1 -= 12;
        if(m_1 === 0) m_1 = 12;
        if(m_2 > 12) m_2 -= 12;
        if(m_2 === 0) m_2 = 12;
        if(m_1_new > 12) m_1_new -= 12;
        if(m_1_new === 0) m_1_new = 12;
        if(m_2_new > 12) m_2_new -= 12;
        if(m_2_new === 0) m_2_new = 12;


        if(thisweek){
            if(m_1===m_2){
                return([`${months[m_1-1]}`,m_1,m_1])
            }else{
                return([`${months[m_1-1]}/${months[m_2-1]}`,m_1,m_2])
            }
        }else{
            if(m_1_new===m_2_new){
                return([`${months[m_1_new-1]}`,m_1_new,m_1_new])
            }else{
                return([`${months[m_1_new-1]}/${months[m_2_new-1]}`,m_1_new,m_2_new])
            }
        }
    }
    const isOnline = navigator.onLine;
    const toggle = isOnline ? 'toggle' : '';
    
    const montag1 = showd_Mon(true);
    const dienstag1 = showd_Tue(true);
    const mittwoch1 = showd_Wed(true);
    const donnerstag1 = showd_Thu(true);
    const freitag1 = showd_Fri(true);
    const montag2 = showd_Mon(false);
    const dienstag2 = showd_Tue(false);
    const mittwoch2 = showd_Wed(false);
    const donnerstag2 = showd_Thu(false);
    const freitag2 = showd_Fri(false);
    const month1 = month_Now(true)[1];
    const month2 = month_Now(false)[1]

    const weekdays = [month1*10**2+montag1];
    
    if (montag1 < dienstag1) {
        weekdays.push(month1*10**2+dienstag1);

        if (dienstag1 < mittwoch1) {
            weekdays.push(month1*10**2+mittwoch1);

            if (mittwoch1 < donnerstag1) {
                weekdays.push(month1*10**2+donnerstag1);

                if (donnerstag1 < freitag1) {
                    weekdays.push(month1*10**2+freitag1);

                } else {
                    weekdays.push((month1+1)*10**2+freitag1);
                }
            } else {
                weekdays.push((month1+1)*10**2+donnerstag1);
                weekdays.push((month1+1)*10**2+freitag1);
            }
        } else {
            weekdays.push((month1+1)*10**2+mittwoch1);
            weekdays.push((month1+1)*10**2+donnerstag1);
            weekdays.push((month1+1)*10**2+freitag1);
        }
    }else {
        weekdays.push((month1+1)*10**2+dienstag1);
        weekdays.push((month1+1)*10**2+mittwoch1);
        weekdays.push((month1+1)*10**2+donnerstag1);
        weekdays.push((month1+1)*10**2+freitag1);
    }

    weekdays.push((month2)*10**2+montag2);
    if (montag2 < dienstag2) {
        weekdays.push(month2*10**2+dienstag2);

        if (dienstag2 < mittwoch2) {
            weekdays.push(month2*10**2+mittwoch2);

            if (mittwoch2 < donnerstag2) {
                weekdays.push(month2*10**2+donnerstag2);

                if (donnerstag2 < freitag2) {
                    weekdays.push(month2*10**2+freitag2);

                } else {
                    weekdays.push((month2+1)*10**2+freitag2);
                }
            } else {
                weekdays.push((month2+1)*10**2+donnerstag2);
                weekdays.push((month2+1)*10**2+freitag2);
            }
        } else {
            weekdays.push((month2+1)*10**2+mittwoch2);
            weekdays.push((month2+1)*10**2+donnerstag2);
            weekdays.push((month2+1)*10**2+freitag2);
        }
    } else {
        weekdays.push((month2)*10**2+dienstag2);
        weekdays.push((month2)*10**2+mittwoch2);
        weekdays.push((month2)*10**2+donnerstag2);
        weekdays.push((month2)*10**2+freitag2);
    }

    const Info = JSON.parse(localStorage.getItem('Info'));
    const classid = Info.classid ? Info.classid : [];

    const days = ["Mon","Tue","Wed","Thu","Fri"];
    const week_dates1 = [montag1,dienstag1,mittwoch1,donnerstag1,freitag1];
    const week_dates2 = [montag2,dienstag2,mittwoch2,donnerstag2,freitag2];

    const listfor6 = [1,2,3,4,5,6];
    const listfor5 = [0,1,2,3,4];
    const uni_list = ["基準服","","","","",""]

    const toclassroom = (e) => { //クラスルームに飛べるようにするやつ
        const c_id = e.name ? e.name.split('td_')[1] : null; //動作に問題ないけどエラー吐かれたから一応書いとく
        var link;
        try { //Safariだと怒られたから書いとく
            link = classid[c_id]
        } catch(error) {
            link = null;
        }

        if(link) {
            window.open(link, '_blank');
        }
    }
    if (isSmartPhone()){
        return(      
            <div className={styles.table_container} id="tableContainer" style={{width: "100%", height: "70%", position: "absolute"}}>
                <div className={styles.inner}>
                    <div className = {`${styles.slider} ${isLeft ? styles.left : styles.right}`}>
                        <div className={styles.resizer} id="bottomRightResizer"></div>
                        <table align="center" border="1" className={styles.tableslider}>
                            <thead className={styles.head}>
                                <tr>
                                    <th/>
                                    {days.map((item,index) => (
                                        <th 
                                            key={`th${index}`} 
                                            className= {day===index+1 ? styles.today : styles.not_today} 
                                        >{item}</th>
                                    ))}
                                    <th/>
                                    {days.map((item,index) => (
                                        <th 
                                            key={`th${index+5}`} 
                                            className= {styles.not_today} 
                                        >{item}</th>
                                    ))}
                                </tr>
                                <tr>
                                    <th>{month_Now(true)[0]}</th>
                                    {week_dates1.map((item,index) => (
                                        <th 
                                            key={`thd${index}`} 
                                            className= {day===index+1 ? styles.today : styles.not_today} 
                                        >{item}
                                        </th>
                                    ))}
                                    <th>{month_Now(false)[0]}</th>
                                    {week_dates2.map((item,index) => (
                                        <th 
                                            key={`thd${index+5}`} 
                                            className= {styles.not_today}                                            
                                        >{item}
                                        </th>
                                    ))}
                                </tr>
                                <tr>
                                    {uni_list.map((item,index) => (
                                        <th
                                            key={`uni${index}`}
                                            className={styles.not_today}
                                        >{item}{uniform_days.includes(weekdays[index-1]) && index !== 0 ? <Uni_img/> : ""}</th>
                                    ))}
                                    {uni_list.map((item,index) => (
                                        <th
                                            key={`uni${index+5}`}
                                            className={styles.not_today}
                                        >{item}{uniform_days.includes(weekdays[index+4]) && index !== 0 ? <Uni_img/> : ""}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {listfor6.map((period,p_index) => ( //period as 'n時間目'
                                    <tr key={p_index}>
                                        <td className="tn" style={{cursor:"default"}}>{period}</td> 
                                        {listfor5.map((item,index) => (
                                            <td 
                                                className="htdata"
                                                id={6*index+p_index} 
                                                key={`tn${6*index+p_index}`}
                                                onClick={(e) => {toclassroom(e.target)}}
                                            />
                                        ))}
                                        <td className="tn" style={{cursor:"default"}}>{period}</td> 
                                        {listfor5.map((item,index) => (
                                            <td 
                                                className="htdata" 
                                                id={6*(index+5)+p_index} 
                                                key={`tn${6*(index+5)+p_index}`}
                                                onClick={(e) => {toclassroom(e.target)}}
                                            />
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table><br />
                        </div>
                    </div>
            </div>
        )
    }else{
        return(      
            <div className={styles.table_container} id="tableContainer" style={{width: "70%", height: "60%", left: "15%"}}>
                <div className={styles.inner}>
                    <div className = {`${styles.slider} ${isLeft ? styles.left : styles.right}`}>
                        <div className={styles.resizer} id="bottomRightResizer"></div>
                        <table align="center" border="1" className={styles.tableslider}>
                            <thead className={styles.head}>
                                <tr>
                                    <th/>
                                    {days.map((item,index) => (
                                        <th 
                                            key={`th${index}`} 
                                            className= {day===index+1 ? styles.today : styles.not_today} 
                                            
                                        >{item}</th>
                                    ))}
                                    <th/>
                                    {days.map((item,index) => (
                                        <th 
                                            key={`th${index+5}`} 
                                            className= {styles.not_today} 
                                        >{item}</th>
                                    ))}
                                </tr>
                                <tr>
                                    <th>{month_Now(true)[0]}</th>
                                    {week_dates1.map((item,index) => (
                                        <th 
                                            key={`thd${index}`} 
                                            className= {day===index+1 ? styles.today : styles.not_today}                                            
                                        >{item}
                                        </th>
                                    ))}
                                    <th>{month_Now(false)[0]}</th>
                                    {week_dates2.map((item,index) => (
                                        <th 
                                            key={`thd${index+5}`} 
                                            className= {styles.not_today}                                           
                                        >{item}
                                        </th>
                                    ))}
                                </tr>
                                <tr>
                                    {uni_list.map((item,index) => (
                                        <th
                                            key={`uni${index}`}
                                            className={styles.not_today}
                                        >{item}{uniform_days.includes(weekdays[index-1]) && index !== 0 ? <Uni_img/> : ""}</th>
                                    ))}
                                    {uni_list.map((item,index) => (
                                        <th
                                            key={`uni${index+5}`}
                                            className={styles.not_today}
                                        >{item}{uniform_days.includes(weekdays[index+4]) && index !== 0 ? <Uni_img/> : ""}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {listfor6.map((period,p_index) => ( //period as 'n時間目'
                                    <tr key={p_index}>
                                        <td className="tn" style={{cursor:"default"}}>{period}</td> 
                                        {listfor5.map((item,index) => (
                                            <td 
                                                className="htdata"
                                                id={6*index+p_index} 
                                                key={`tn${6*index+p_index}`}
                                                onClick={(e) => {toclassroom(e.target)}}
                                            />
                                        ))}
                                        <td className="tn" style={{cursor:"default"}}>{period}</td> 
                                        {listfor5.map((item,index) => (
                                            <td 
                                                className="htdata" 
                                                id={6*(index+5)+p_index} 
                                                key={`tn${6*(index+5)+p_index}`}
                                                onClick={(e) => {toclassroom(e.target)}}
                                            />
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table><br />
                        </div>
                    </div>
                </div>
        )
    }
}


/*以下元の時間割表示コード ゴツすぎて草

<table align="center" border="1" className={styles.tableslider}>
    <thead className={styles.head}>
        <tr >
            <th></th>
            <th className= {day===1 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[0]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>Mon</th>
            <th className= {day===2 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[1]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>Tue</th>
            <th className= {day===3 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[2]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>Wed</th>
            <th className= {day===4 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[3]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>Thu</th>
            <th className= {day===5 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[4]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>Fri</th>
            <th></th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[5]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>Mon</th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[6]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>Tue</th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[7]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>Wed</th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[8]) ? {borderColor:'rgb(255, 250, 146)'} : {}}>Thu</th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[9]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>Fri</th>
        </tr>
        <tr>
            <th>{month_Now(true)[0]}</th>
            <th className= {day===1 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[0]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Mon(true)}</th>
            <th className= {day===2 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[1]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Tue(true)}</th>
            <th className= {day===3 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[2]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Wed(true)}</th>
            <th className= {day===4 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[3]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Thu(true)}</th>
            <th className= {day===5 ? styles.today : styles.not_today} style={uniform_days.includes(weekdays[4]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Fri(true)}</th>
            <th>{month_Now(false)[0]}</th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[5]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Mon(false)}</th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[6]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Tue(false)}</th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[7]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Wed(false)}</th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[8]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Thu(false)}</th>
            <th className= {styles.not_today} style={uniform_days.includes(weekdays[9]) ? {borderColor:'rgb(254, 245, 61)'} : {}}>{showd_Fri(false)}</th>
        </tr>
    </thead>
    <tbody>
        <tr><td className="tn">1</td><td className="htdata" id="0"></td><td className="htdata" id="6"></td><td className="htdata" id="12"></td><td className="htdata" id="18"></td><td className="htdata" id="24"></td><td className="tn">1</td><td className="htdata" id="30"></td><td className="htdata" id="36"></td><td className="htdata" id="42"></td><td className="htdata" id="48"></td><td className="htdata" id="54"></td></tr>
        <tr><td className="tn">2</td><td className="htdata" id="1"></td><td className="htdata" id="7"></td><td className="htdata" id="13"></td><td className="htdata" id="19"></td><td className="htdata" id="25"></td><td className="tn">2</td><td className="htdata" id="31"></td><td className="htdata" id="37"></td><td className="htdata" id="43"></td><td className="htdata" id="49"></td><td className="htdata" id="55"></td></tr>
        <tr><td className="tn">3</td><td className="htdata" id="2"></td><td className="htdata" id="8"></td><td className="htdata" id="14"></td><td className="htdata" id="20"></td><td className="htdata" id="26"></td><td className="tn">3</td><td className="htdata" id="32"></td><td className="htdata" id="38"></td><td className="htdata" id="44"></td><td className="htdata" id="50"></td><td className="htdata" id="56"></td></tr>
        <tr><td className="tn">4</td><td className="htdata" id="3"></td><td className="htdata" id="9"></td><td className="htdata" id="15"></td><td className="htdata" id="21"></td><td className="htdata" id="27"></td><td className="tn">4</td><td className="htdata" id="33"></td><td className="htdata" id="39"></td><td className="htdata" id="45"></td><td className="htdata" id="51"></td><td className="htdata" id="57"></td></tr>
        <tr><td className="tn">5</td><td className="htdata" id="4"></td><td className="htdata" id="10"></td><td className="htdata" id="16"></td><td className="htdata" id="22"></td><td className="htdata" id="28"></td><td className="tn">5</td><td className="htdata" id="34"></td><td className="htdata" id="40"></td><td className="htdata" id="46"></td><td className="htdata" id="52"></td><td className="htdata" id="58"></td></tr>
        <tr><td className="tn">6</td><td className="htdata" id="5"></td><td className="htdata" id="11"></td><td className="htdata" id="17"></td><td className="htdata" id="23"></td><td className="htdata" id="29"></td><td className="tn">6</td><td className="htdata" id="35"></td><td className="htdata" id="41"></td><td className="htdata" id="47"></td><td className="htdata" id="53"></td><td className="htdata" id="59"></td></tr>
    </tbody>
</table>
*/