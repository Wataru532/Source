import styles from '../../UpdateLog/UpdateLog.module.css'
import { GuestHeaderTop } from '../guest_Header/guest_Header'

export const GuestUpdateLog =()=>{
    return(
        <div>
            <GuestHeaderTop />
                <div className={styles.body}>
                <h1 className={styles.title}>Scheduler Update Log</h1> {/*title*/}
                {/*以下テンプレート*/}
                <h3 className={styles.virsion}>v2.2.0 - 2024/11/10</h3>
                <p className={styles.info}>
                    中間発表会以降のアップデートを実装<br />
                </p>
                <h3 className={styles.virsion}>v1.1.0 - 2024/7/8</h3>
                <p className={styles.info}>
                    一時的にGoogleAccountを要せずにログイン利用できる仕様を追加<br />
                    中間発表会を目途に削除予定<br />
                </p>

                <h3 className={styles.virsion}>v1.0.1 - 2024/7/6</h3>
                <p className={styles.info}>
                    日本史が選択できない不具合を修正<br />
                    一部UIを変更<br />
                </p>

                <h3 className={styles.virsion}>v1.0.0 - 2024/7/3</h3>
                <p className={styles.info}>
                    正式リリース  <br />
                    アカウント単位でデータを保存 <br />
                    →Chromebook とスマホで設定の共有が可能に<br />
                    教科の背景色の変更機能の追加 <br />
                    
                </p>

                <h3 className={styles.virsion}>v0.0.3 - 2024/5/29</h3>
                <p className={styles.info}>
                    一部画面でページを更新したら何も表示されなくなる不具合を修正
                </p>
                <h3 className={styles.virsion}>v0.0.2 - 2024/5/27</h3>
                <p className={styles.info}>
                    Updated Design. Added user icon.<br />
                    その他変化なし。
                </p>

                <h3 className={styles.virsion}>v0.0.1 - 2024/5/27</h3>
                <p className={styles.info}>
                    First release. <br />
                    ＜現状＞<br />
                    ・1週間分の時間割表示<br />
                    ＜課題＞<br />
                    ・データ受取の自動化<br />
                    ・同ユーザ異デバイス間での設定の同期<br />
                    ・2週間分の時間割の表示<br />
                    ＜展望＞<br />
                    ・時間割テーブルの配置自由化<br />
                    ・Homeにて付箋の貼り付け機能<br />
                    ・教科カラー設定の自由化<br />
                </p>

                <a href="https://forms.gle/9ExuRPUDyRMcMxxp8" className={styles.f_form} target="_blank" rel="noopener noreferrer">Add Feedback</a>
            </div>
        </div>
    )
}