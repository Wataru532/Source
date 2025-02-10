import React from 'react';
import { ChromePicker } from 'react-color';
import { useState } from 'react'
import styles from '../.././Settings/subj_col.module.css'
import { useNavigate } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';

const GuestSubjCol =(props)=>{
  const ColorPicker = (props)=> {
    const navigate= useNavigate()

    const subject = props.subject
    var Info=props.Info

    const subj_name_list={
    '国語':'td_ja',
    '数学':'td_math',
    '社会':'td_soci',
    '理科':'td_sci',
    '英語':'td_en',
    '保体':'td_pe',
    '家庭科':'td_homE',
    '情報':'td_info',
    '芸術' :'td_art'
    }
    const subj = subj_name_list[subject]
    const subj_col = Info.subj_col[subj]

    const [subjcolor,setColor] = useState(subj_col)
    const [IsOpen,setOpen] = useState(false)

    const handleChange = (color) => {
      //stateに選択した色を保存
      setColor(color.hex)
      //それをlocalstrageとfirestoreに保存
      if (subj==='td_ja'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_ja=color.hex
        localStorage.setItem('Info',JSON.stringify(data))
      }else if (subj==='td_math'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_math=color.hex
        localStorage.setItem('Info',JSON.stringify(data))
      }else if (subj==='td_soci'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_soci=color.hex
        localStorage.setItem('Info',JSON.stringify(data))
      }else if (subj==='td_sci'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_sci=color.hex
        localStorage.setItem('Info',JSON.stringify(data))
      }else if (subj==='td_en'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_en=color.hex
        localStorage.setItem('Info',JSON.stringify(data))
      }else if (subj==='td_pe'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_pe=color.hex
        localStorage.setItem('Info',JSON.stringify(data))
      }else if (subj==='td_homE'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_homE=color.hex
        localStorage.setItem('Info',JSON.stringify(data))
      }else if (subj==='td_info'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_info=color.hex
        localStorage.setItem('Info',JSON.stringify(data))
      }else if (subj==='td_art'){
        const data = JSON.parse(localStorage.getItem('Info'))
        data.subj_col.td_art=color.hex
        localStorage.setItem('Info',JSON.stringify(data))
      }
    }

    const ChangeCol = () =>{
      if (IsOpen){
        return(
          <div className={styles.pikker}>
            <div className={styles.pikkerBack} onClick={()=>{setOpen(false)}}></div>
              <ChromePicker
                disableAlpha={true}
                color={ subjcolor }
                onChange={ handleChange }
              />
          </div>
        )
      }
    }
    //リセットボタンの場合
    if (props.reset===true){
      const reset_col = ()=>{
        Info=JSON.parse(localStorage.getItem('Info'))
        Info.subj_col.td_ja='#ff3e3e9c'
        Info.subj_col.td_math='#2c68ff9c'
        Info.subj_col.td_soci='#ff9a479c'
        Info.subj_col.td_sci='#4e963d9c'
        Info.subj_col.td_en='#ffe8379c'
        Info.subj_col.td_homE='#9863be9c'
        Info.subj_col.td_info='#63b6b79c'
        Info.subj_col.td_pe='#ffd6aa9c'
        Info.subj_col.td_art='#ffadf49c'
        localStorage.setItem('Info',JSON.stringify(Info))
        navigate('/Guest_Home',{state:'/Guest_settings'})
      }


      return(
        <div className={styles.reset_container}>
          <p2 className={styles.subjName}>リセット</p2> <br />
          <button onClick={reset_col} className={styles.reset_btn}>
            <CachedIcon />
          </button>
        </div>
      )
    //それ以外
    }else{
      return (
        <div className={styles.container}>
          <p2 className={styles.subjName}>{props.subject}</p2> <br />
          <button onClick={()=>{setOpen(true)}} style={ { background: subjcolor }} className={styles.btn}></button>
          <ChangeCol />
        </div>
      );
    }
  }

  const grade1 = ['1-1','1-2','1-3','1-4','1-5','1-6']
  const grade2 = ['2-1','2-2','2-3','2-4','2年理探','2年国探']
  const grade3 = ['3-1','3-2','3-3','3-4','3年理探','3年国探']
  const userClass = props.class
  
  if (grade1.includes(userClass)){
    return(
      <div>
        <ColorPicker subject='国語' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='数学' Info={props.Info} userid={props.userid}/>
        <ColorPicker subject='社会' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='理科' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='英語' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='家庭科' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='保体' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='情報' Info={props.Info} userid={props.userid} />
        <ColorPicker reset={true} Info={props.Info} userid={props.userid} />
      </div>
    )
  }else if (grade2.includes(userClass)){
    return(
      <div>
        <ColorPicker subject='国語' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='数学' Info={props.Info} userid={props.userid}/>
        <ColorPicker subject='社会' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='理科' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='英語' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='保体' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='芸術' Info={props.Info} userid={props.userid} />
        <ColorPicker reset={true} Info={props.Info} userid={props.userid} />
      </div>
    )
  }else if (grade3.includes(userClass)){
    return(
      <div>
        <ColorPicker subject='国語' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='数学' Info={props.Info} userid={props.userid}/>
        <ColorPicker subject='社会' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='理科' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='英語' Info={props.Info} userid={props.userid} />
        <ColorPicker subject='保体' Info={props.Info} userid={props.userid} />
        <ColorPicker reset={true} Info={props.Info} userid={props.userid} />
      </div>
    )
  }

}
export { GuestSubjCol }