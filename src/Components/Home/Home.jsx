import React, { useState, useRef } from 'react';
import styles from './Home.module.css';
import logo from '../../img/logo192.png';
import { VersionData } from '../Data/VersionData';
import { DayProcess } from '../Functions/DayProcess';
import { Upload } from '../Functions/Upload';

export const Home = () => {
    const gotDayData = DayProcess();
    const m_1 = gotDayData.m_1;
    const m_2 = gotDayData.m_2;
    const m_1_new = gotDayData.m_1_new;
    const m_2_new = gotDayData.m_2_new;
    const mon_date = gotDayData.mon_date;
    const mon_date_new = gotDayData.mon_date_new;
    const fri_date = gotDayData.fri_date;
    const fri_date_new = gotDayData.fri_date_new;

    //ファイル取得用コード
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const dropRef = useRef(null);
  
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };
    
    const handleDragLeave = () => {
        setIsDragging(false);
    };
  
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFile = event.dataTransfer.files[0]; // 1つだけ取得
        if (droppedFile) {
            if(droppedFile.type === "text/csv") {
                setFile(droppedFile); 
            } else {
                alert("CSV形式の時間割データをアップロードしてください");
                setFile(null);
            }
        }
    };


    return (
        <div 
            className={`${styles.body} ${isDragging ? styles.dragover : ''}`}
            ref={dropRef}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <section className={styles.headsection}>
                <a href="https://Scheduler532.github.io/Schedular/"><img className={styles.homeImg1} src={logo} /></a>
                <p className={styles.title}>Scheduler Data</p>
            </section>
            <h2>Schedulerファイルアップロード</h2>
            <p className={styles.text}><strong>クラス一覧.csv</strong>ファイルを選択してください。また、今週か来週かも選択してください。</p>
            {/*<input type="file" id="csvFile" accept=".csv" className={styles.filebutton}/>*/}
            <div className={styles.upFileWrap}>
                <div className={styles.inputFile}>
                    {/*ドラッグ&ドロップエリア*/}
                    <p 
                        id="dropArea" 
                        className={`${styles.dropArea} ${isDragging ? styles.dragover : ''}`}
                    >ここにファイルをドロップしてください<br/>または</p>
            
                    {/* 通常のinput[type=file] */}
                    <div className={styles.inputFileWrap}>
                        <input type="file" name="uploadcsvFile" id="csvFile" className={styles.csvFile} accept=".csv" />
                        <div className={styles.btnInputFile}><label htmlFor="csvFile">ファイルを選択する</label>
                    </div>
                </div>
            </div>
            <span className={styles.fileuploading}>
                <form className={styles.radio_s} name="week">
                    <div>
                        <input type="radio" id="thisweek"  className={styles.thisweek} name="weekselect" value="thisweek" />
                        <label htmlFor="thisweek" id="tweektxt">今週 : {m_1}/{mon_date}〜{m_2}/{fri_date}</label>
                    </div>
                    <div>
                        <input type="radio" id="nextweek" className={styles.nextweek} name="weekselect" value="nextweek" />
                        <label htmlFor="nextweek" id="nweektxt">来週 : {m_1_new}/{mon_date_new}〜{m_2_new}/{fri_date_new}</label>
                    </div>
                </form>
                <p id="filename" className={styles.filename}>{file ? file.name : ""}</p>
                <button onClick={() => Upload(file)} className={styles.filebutton} >アップロード</button> {/*onClick={Upload()}*/}
            </span>
            <div className={styles.txts}>
                <a className={styles.versiontxt} href="https://github.com/Wataru532/Scheduler_data/blob/main/version.md">v{VersionData()}</a><br/>
                <a className={styles.feedbacktxt} href="https://forms.gle/9ExuRPUDyRMcMxxp8" target="_blank" rel="noopener noreferrer">Feedback</a>
            </div>
        </div>
        </div>
    )
}