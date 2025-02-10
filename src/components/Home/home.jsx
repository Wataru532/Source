import { Header } from "../Header/Header"
import styles from './home.module.css'
import { useEffect, useState } from 'react'
import {  useNavigate } from "react-router-dom"
import { isSmartPhone } from "../Header/Header"
import { auth } from "../Auth/Auth"
import { Table } from "./table"
import { OfflineViewdata, Viewdata } from "./Viewdata"
import { Warning } from "./warning"
import { useSwipeable } from 'react-swipeable'
import { Version_data } from "../data/Version_data"
import { Uniform } from "../Uniform/Uniform"


const now = new Date();
const month = now.getMonth();
const date = now.getDate();
const day = now.getDay();
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const weeks = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];



function showDay() {
    return (weeks[day] + " " + months[month] + "/" + date + " " + now.getFullYear());
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



export const Home = () =>{
    //リロード対策
    useEffect(()=> {
        //console.log(2)
        if (!(auth.currentUser) && isOnline){
            navigate('/',{state:'/Home'})
        }// else{resizing()}
    })

    const navigate = useNavigate()
    const [isLeft, setIsLeft] = useState(true);
    const [Info,setInfo] = useState(null)
    useEffect(() => {
        // ローカルストレージから Info を取得
        const storedInfo = JSON.parse(localStorage.getItem("Info"));
        setInfo(storedInfo);
    
        // Info が null の場合に画面遷移
        if (!storedInfo) {
          navigate("/");
        } 
        
    }, [navigate]);

    
    const [thisweek,setWeek] = useState(true)
    const isOnline = navigator.onLine
    const [open,setOpen] =useState(false)
    
    //スワイプ判定系
    const swipetoggle = (e) => {
        if(e.dir==='Left'){
            setIsLeft(false);
        }else if(e.dir==='Right'){
            setIsLeft(true);
        }
        //console.log(e.dir)
    }
    
    const handlers = useSwipeable({
        onSwiped: (e) => swipetoggle(e),
        delta: 10,
        
    });
    
    document.addEventListener('keydown',function(event){
        if(event.key==='ArrowLeft'){
            setIsLeft(true)
        }else if (event.key === 'ArrowRight'){
            setIsLeft(false)
        }
    })
    //ここまで
    
    if (isOnline && auth.currentUser){
        Viewdata(thisweek)
    }else{
        OfflineViewdata()
        window.addEventListener('online',()=>{navigate('/')})
    }
    if(!Info){
        return null
    }
    const userclass = Info.class

    //popup
    Warning()
    
    if (isSmartPhone()){
        return (
            <div onClick={(g)=>{if (g.target.id!==("btn")){setOpen(false)}}}>
            <Header />
            <span className={styles.body}>
                <span className={styles.info}> 
                    <span align="right" className={styles.version_mobile}>v{Version_data()}</span>
                    <span className={styles.p2}>{userclass}, 
                        <strong>{isLeft===true?'今週':'来週'}</strong>
                    </span>
                    {/*<p className={styles.p2}>Today : {showDay()}</p><br />*/}
                    {/*<div><HelpMenu  open={open} setOpen={ setOpen }/></div>*/}
                    <Uniform handy={true}/>
                </span>
                <span {...handlers}>
                    <Table setIsLeft={setIsLeft} isLeft={isLeft}/>
                </span>
            </span>
        </div>
    )
    }else{
        return (
            <div onClick={(g)=>{if (g.target.id!==("btn")){setOpen(false)}}}>
                <Header />
                <div className={styles.body}>
                    <span className={styles.info}> 
                        <span className={styles.p2}>Class : {userclass}</span>
                        <span align="right" className={styles.version}>v{Version_data()}</span> <br/>
                        {/*<p className={styles.p2}>Today : {showDay()}</p><br />*/}
                        <span className={styles.p2}>{showDay()} Displaying :  <strong>{isLeft===true?"今週":"来週"}</strong><span className={styles.toggleb_2} onClick={()=>{
                            setWeek.bind(null, !thisweek)
                            setIsLeft(!isLeft)
                            }}><strong>{isLeft ? '＞' : '＜'}</strong></span>
                        </span>
                        {/*<HelpMenu  open={open} setOpen={setOpen}/>*/}
                        <Uniform handy={false}/>
                    </span>
                    <span {...handlers}>
                        <Table setIsLeft={setIsLeft} isLeft={isLeft}/>
                    </span>
                </div>
            </div>
        )
    }
}

export default Home;

