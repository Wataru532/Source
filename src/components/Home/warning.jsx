import { auth } from "../Auth/Auth";
import swal from 'sweetalert2';
import styles from './warning.module.css';
import { Version_data } from "../data/Version_data";


// ↓Home実行したときに出す警告　async/await 使わないとバグるから注意
export const Warning = async()=>{
    const Info = JSON.parse(localStorage.getItem('Info'))
    if(!Info){
        return null
    }
    if(!Info.class && auth.currentUser){
        await swal.fire({
            title:'注意',
            html:'クラスが設定されていません</br>スマホの場合は左上の三本線,Chromebookの場合はヘッダー部分からsettingを開いて設定してください',
            icon:'warning'
          })
    }

    //Update Info and Ads
    const version = Version_data(); //現在のバージョンを管理
    var adcnt = Number(localStorage.getItem("adcnt"));
    
    fetch("https://raw.githubusercontent.com/Wataru532/SchedulerStorage/main/update_and_ad.json")
    .then(function(response){
        if(!response.ok) {
            console.error("Something went wrong...")
        }
        return response.json()
    })
    .then(function(data){
        const jsonData = data;
        
        //Stableとして公開する時には必ずオンにすること。
        /*
        if(jsonData["update"]["version"] !== version) { //アップデート確認表示
            swal.fire({
                title: "お知らせ",
                html:`${jsonData["update"]["content"]}`,
                icon:"info",
            })
        }*/

        if(jsonData["ad"]["display"] === true) {
            const f = jsonData.ad.frequency;
            if(adcnt/f > 100) localStorage.setItem('adcnt','0');
            if(adcnt%f === 0){
                swal.fire({
                    title: `<div class=${styles.title}>${jsonData["ad"]["title"]}</div>`,
                    icon: "info",
                    customClass: "warn_body",
                    html: 
                        `<p class=${styles.content}>${jsonData["ad"]["content"]}</p>
                        <a class=${styles.url}
                            href=${jsonData["ad"]["url"]} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onclick=${swal.close()}>

                            ${jsonData["ad"]["url_message"]}
                        </a>`,

                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
                    confirmButtonColor: "#3085d6"
                })
            }
            adcnt++;
            localStorage.setItem("adcnt",adcnt)
        }

    })
    //checkedシリーズは毎回数字一つ大きくする　それ以外は変更いらない
    /*
    if(!Boolean(parseInt(localStorage.getItem('checked7'))) && auth.currentUser){
        await swal.fire({
            title:'お知らせ',
            html:'スマホ版の設定画面が見やすくなりました。',
            icon:'info',
            showCancelButton:true,
            cancelButtonText:'これ以上表示しない'
            }).then((result)=>{
                if(result.isDismissed){
                    localStorage.setItem(`checked7`,1)
                }
            }
        )
    }
    */

    if(!Boolean(parseInt(localStorage.getItem('checked6'))) && auth.currentUser){
        await swal.fire({
            title:'お知らせ',
            html:'機能上の都合により、教科色が反映されない可能性があります。その場合はSettingsから教科色をリセットして対応してください。',
            icon:'info',
            showCancelButton:true,
            cancelButtonText:'これ以上表示しない'
            }).then((result)=>{
                if(result.isDismissed){
                    localStorage.setItem(`checked6`,1)
                }
            }
        )
    }
    /*
    if(!Boolean(parseInt(localStorage.getItem('checked5'))) && auth.currentUser){
        await swal.fire({
            title:'お知らせ',
            html:'表示週の切り替えが矢印キーで行えるようになりました',
            icon:'info',
            showCancelButton:true,
            cancelButtonText:'これ以上表示しない'
            }).then((result)=>{
                if(result.isDismissed){
                    localStorage.setItem(`checked5`,1)
                }
            }
        )
    }*/
    /*
    if(!Boolean(parseInt(localStorage.getItem('checked4'))) && auth.currentUser){
        await swal.fire({
            title:'お知らせ',
            html:'理社の背景色がより詳しく選択できるようになりました。<br />それに伴い部分的に背景色がリセットされる可能性があります。<br />再度設定お願いします',
            icon:'info',
            showCancelButton:true,
            cancelButtonText:'これ以上表示しない'
            }).then((result)=>{
                if(result.isDismissed){
                    localStorage.setItem(`checked4`,1)
                }
            }
        )
    }
    */
    /*
    if(!Boolean(parseInt(localStorage.getItem('checked3'))) && auth.currentUser){
        await swal.fire({
        title:'お知らせ',
        html:'表示する週の変更方法が新しくなりました<br />スマホの場合は表の中を横にスワイプ、<br />PCの場合は四角の中の>か<をクリックで変更出来ます<br />以前同様toggleをクリックしても変更は可能です',
        icon:'info',
        showCancelButton:true,
        cancelButtonText:'これ以上表示しない'
        }).then((result)=>{
            if(result.isDismissed){
                localStorage.setItem(`checked3`,1)
            }
        }
        )
    }
        */
/*
if(!Boolean(parseInt(localStorage.getItem('checked2'))) && auth.currentUser){
        await swal.fire({
        title:'お知らせ',
        html:'来週の分のデータの閲覧も可能になりました<br />表左上のtoggleボタンをおしてご利用ください',
        icon:'info',
        showCancelButton:true,
        cancelButtonText:'これ以上表示しない'
        }).then((result)=>{
            if(result.isDismissed){
                localStorage.setItem(`checked2`,1)
            }
        }
    )
    }
    */
    /*
    if(auth.currentUser){
        await swal.fire({
        title:'謝罪',
        html:'諸事情により時間割が表示されません。迅速な対応をお待ちください。',
        icon:'info',
    })
    }
    */
    /*
    if(!Boolean(parseInt(localStorage.getItem('checked'))) && auth.currentUser){
        await swal.fire({
        title:'お知らせ',
        html:'夏休み(講習を含む)期間中は正確な時間割が表示されません。ご注意ください',
        icon:'info',
        showCancelButton:true,
        cancelButtonText:'これ以上表示しない'
        }).then((result)=>{
            if(result.isDismissed){
                localStorage.setItem(`checked`,1)
            }
        }
    )
    }
    */
   /*
    if(!Boolean(parseInt(localStorage.getItem('checked1'))) && auth.currentUser){
        await swal.fire({
        title:'お知らせ',
        html:'夏休みも終了し、時間割が更新されました(やっと)<br />周りのみんなにも教えてあげてください',
        icon:'info',
        showCancelButton:true,
        cancelButtonText:'これ以上表示しない'
        }).then((result)=>{
            if(result.isDismissed){
                localStorage.setItem(`checked1`,1)
            }
        }
    )
    }
    */
}