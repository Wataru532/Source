import styles from './Assignments.module.css';
import { useState } from 'react';
import { SaveAssignments } from './SaveAssignments';
import { auth } from '../Auth/Auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
/*const onChangeDef = ({isChanged,setIsChanged}) => {
    if(isChanged) {
        return(
            <div>
                <p>変更が保存されていません。保存しますか?</p>
                <button>編集を続ける</button>
                <button>破棄する</button>
            </div>
        )
    }else {
        setv(!v);
    }
}*/

export const PostDisplay = ({v,setv,subjs,classes,isHandy,setIsOpen,setIsError,setBannerContent}) => {
    const isOnline = navigator.onLine;
    
    if(!isOnline && auth.currentUser){
        Swal.fire({
            title:'注意',
            html:'オフラインで実行中です。課題の投稿はできません。',
            icon:'warning'
        })
    }


    const [text, setText] = useState("");
    const [contenttext,setContenttext] = useState("");
    const [isFilled,setIsFilled] = useState(false);
    //const [isChanged,setIsChanged] = useState(false);
    if(!auth.currentUser){
        return;
    }
    const username = auth.currentUser.displayName;

    const classid = {"全校":"a","1年次":"g1","2年次":"g2","3年次":"g3","1年普通科":"n1","2年普通科":"n2","3年普通科":"n3","1年探究科":"t1","2年探究科":"t2","3年探究科":"t3","1-1":"11","1-2":"12","1-3":"13","1-4":"14","1-5":"15","1-6":"16","2-1":"21","2-2":"22","2-3":"23","2-4":"24","2年国探":"25","2年理探":"26","3-1":"31","3-2":"32","3-3":"33","3-4":"34","3年国探":"35","3年理探":"36"}
    const subjid = {"数学":"math","国語":"ja","英語":"en","化学":"che","物理":"phy"," 理物":"phy","理物":"phy","生物":"bio"," 地理":"geo",
        "地理":"geo","歴史":"his","日本史":"his","世界史":"his","公共":"pub","情報":"info","家庭科":"homE","保健体育":"pe"," 音楽":"art","音楽":"art",
        " 書道":"art","書道":"art"," 美術":"art","美術":"art","その他":"none"}
    
    const Upload = () => {
        const uploadjson = JSON.parse(sessionStorage.getItem('presave'));
        const getdata = JSON.parse(sessionStorage.getItem('Assignments_Save'));
        getdata.assignments.push(uploadjson);
        sessionStorage.setItem('Assignments_Save',JSON.stringify(getdata));
        setv(!v);
        sessionStorage.setItem("isAssignmentsSaved",false);
        SaveAssignments(setIsError,setBannerContent);
        setIsOpen(true);
    }

    const FilledCheck = () => {
        const duedate = document.getElementById("duedate").value;
        const cl = document.getElementById("class").value;
        const sb = document.getElementById("subjects").value;
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const uploadjson = {};
        var f_ch = 0;
        if(title!=="") f_ch++;
        if(content!=="") f_ch++;
        if(cl!=="null") f_ch++;
        if(sb!=="null") f_ch++;
        if(duedate!=="") f_ch++;

        if(f_ch===5) {
            uploadjson.subject = sb;
            uploadjson.class = cl;
            uploadjson.title = title;
            uploadjson.duedate = duedate;
            uploadjson.content = content;
            uploadjson.author = username;
            setIsFilled(true);
            sessionStorage.setItem('presave',JSON.stringify(uploadjson));
        } else {
            setIsFilled(false);
        }
    }

    const disableClick = (e) => {
        e.stopPropagation();
    };

    if(isHandy) {
        return(
            <div style={{overflow:'hideen'}}>
                <div className={`${styles.postbg} ${v ? '' : styles.close}`} onClick={()=>setv(!v)}/> {/*背景*/}
                <div className={`${styles.postcontainer_handy} ${v ? styles.open : ''}`} onClick={disableClick}>
                    <h1>新しい課題を投稿</h1>
                    <span className={styles.closebutton} onClick={()=>setv(!v)}>X</span> {/*Close Button*/}
                    <div className={styles.bar_bg}> {/*タイトル入力*/}
                        <input type='text' 
                            id='title'
                            placeholder='タイトルを入力' 
                            className={styles.fillin} 
                            value={text} 
                            onChange={(e) => {setText(e.target.value); FilledCheck();}}
                        ></input>
                    </div>
                    <div className={styles.largebar_bg}> {/*詳細入力*/}
                        <textarea 
                            id='content'
                            rows="5"
                            placeholder='詳細を入力' 
                            className={styles.largefillin} 
                            value={contenttext} 
                            onChange={(e) => {setContenttext(e.target.value); FilledCheck();}}
                        ></textarea>
                    </div>
                    <div className={styles.duedatecontainer}> {/*期日入力*/}
                        <label htmlFor='duedate' className={styles.inputlabel}>期限　：</label>
                        <input 
                            type='date' 
                            className={styles.inputduedate}
                            id='duedate'
                            onChange={FilledCheck}
                        ></input>
                    </div>
                    <div className={styles.classcontainer}> {/*クラス*/}
                        <label htmlFor='class' className={styles.inputlabel}>クラス：</label>
                        <select id='class' className={styles.inputclass} onChange={FilledCheck}>
                            <option value="null">未選択</option><hr/>
                            {classes.map((item,index) => (
                                <option key={index} value={classid[item]}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.subjectscontainer}> {/*教科*/}
                        <label htmlFor='subjects' className={styles.inputlabel}>教科　：</label>
                        <select id='subjects' className={styles.inputsubjects} onChange={FilledCheck}>
                            <option value="null">未選択</option><hr/>
                            {subjs.map((item,index) => (
                                <option key={index} value={subjid[item]}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <span className={styles.postbutton} style={{top:'27em'}} onClick={Upload}>＞投稿</span>
                    {isFilled ? "" : (<span className={styles.postbutton_barrier} style={{top:'27em'}}>＞投稿</span>)}
                </div>
            </div>
        )
    } else {
        return(
            <div className={styles.postbg} onClick={()=>setv(!v)}>
                <div className={styles.postcontainer} onClick={disableClick}>
                    <h1>新しい課題を投稿</h1>
                    <span className={styles.closebutton} onClick={()=>setv(!v)}>X</span> {/*Close Button*/}
                    <span className={styles.delbutton} onClick={()=>setv(!v)}>X破棄</span>
                    <span className={styles.postbutton} onClick={Upload}>＞投稿</span>
                    {isFilled ? "" : (<span className={styles.postbutton_barrier}>＞投稿</span>)}
                    <div className={styles.bar_bg}> {/*タイトル入力*/}
                        <input type='text' 
                            id='title'
                            placeholder='タイトルを入力' 
                            className={styles.fillin} 
                            value={text} 
                            onChange={(e) => {setText(e.target.value); FilledCheck();}}
                        ></input>
                    </div>
                    <div className={styles.largebar_bg}> {/*詳細入力*/}
                        <textarea 
                            id='content'
                            rows="5"
                            placeholder='詳細を入力' 
                            className={styles.largefillin} 
                            value={contenttext} 
                            onChange={(e) => {setContenttext(e.target.value); FilledCheck();}}
                        ></textarea>
                    </div>
                    <div className={styles.duedatecontainer}> {/*期日入力*/}
                        <label htmlFor='duedate' className={styles.inputlabel}>期限　：</label>
                        <input 
                            type='date' 
                            className={styles.inputduedate}
                            id='duedate'
                            onChange={FilledCheck}
                        ></input>
                    </div>
                    <div className={styles.classcontainer}> {/*クラス*/}
                        <label htmlFor='class' className={styles.inputlabel}>クラス：</label>
                        <select id='class' className={styles.inputclass} onChange={FilledCheck}>
                            <option value="null">未選択</option><hr/>
                            {classes.map((item,index) => (
                                <option key={index} value={classid[item]}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.subjectscontainer}> {/*教科*/}
                        <label htmlFor='subjects' className={styles.inputlabel}>教科　：</label>
                        <select id='subjects' className={styles.inputsubjects} onChange={FilledCheck}>
                            <option value="null">未選択</option><hr/>
                            {subjs.map((item,index) => (
                                <option key={index} value={subjid[item]}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}