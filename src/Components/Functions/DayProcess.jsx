export const DayProcess = () => {
    const now = new Date();
    const year = now.getYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();

    var dates;
    var mon_date;
    var mon_date_new;
    var fri_date;
    var fri_date_new;

    if (year%4==0 && !(year%100==0 && year%400!=0)) {
        dates = [31,29,31,30,31,30,31,31,30,31,30,31];
    } else{
        dates = [31,28,31,30,31,30,31,31,30,31,30,31];
    }
    
    //This week
    //Monday
    if (date-day+1 > dates[month]){
        mon_date = date-day+1 - dates[month];
    } else if (date-day+1 <= 0){
        mon_date = dates[month === 0 ? 11 : month-1] + date-day+1;
    }else{
        mon_date = date - day + 1;
    }

    //Friday
    if (date-day+5 > dates[month]){
        fri_date = date-day+5-dates[month];
    } else if (date-day+5 <= 0){
        fri_date =  dates[month === 0 ? 11 : month-1] + date-day+5;
    }else{
        fri_date =  date - day + 5;
    }

    //Month
    var m_1;
    var m_2;
    var m_1_new;
    var m_2_new;

    if(date < 10 && mon_date > fri_date){
        m_1 = month;
        m_2 = month+1;
        m_1_new = m_2;
        m_2_new = m_2;
    }
    else if(date > 10 && mon_date > fri_date){
        m_1 = month+1;
        m_2 = month+2;
        m_1_new = m_2;
        m_2_new = m_2;
    }
    else if((date===1 && day===6) || (date===2 && day===0)){
        m_1 = month;
        m_2 = month;
        m_1_new = month + 1;
        m_2_new = month + 1;
    }
    else{
        m_1 = month+1;
        m_2 = m_1;
        if(mon_date+7 > dates[month]){
            m_1_new = m_1 + 1;
            m_2_new = m_1 + 1;
        } else if(fri_date + 7 > dates[month]){
            m_1_new = m_1;
            m_2_new = m_1 + 1;
        } else{
            m_1_new = m_1;
            m_2_new = m_2;
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

    //Nextweek
    if(m_1_new != m_2_new) {
        mon_date_new = mon_date + 7;
        fri_date_new = mon_date + 11 - dates[m_1 - 1];
    } else if(m_1_new != m_1){
        mon_date_new = mon_date + 7 - dates[m_1 - 1];
        fri_date_new = mon_date_new + 4;
    } else {
        mon_date_new = mon_date + 7;
        fri_date_new = mon_date + 11;
    }

    //Next next week
    //Month
    var m_1_nextnext;
    if (m_1_new > m_1 || (m_1_new === m_1 && m_2_new > m_1_new)) { //if month: (thisweek != nextweek), then month: nextnextweek = nextweek
        m_1_nextnext = month + 2; //needs only for monday's month
    } else {
        if (mon_date_new + 7 > dates[m_1_new-1]) {
            m_1_nextnext = month + 2;
        } else {
            m_1_nextnext = month + 1;
        }
    }
    if (m_1_nextnext > 12) m_1_nextnext -= 12;
    
    //Monday
    var mon_date_nextnext;
    if (m_1_nextnext === m_1 || m_1_nextnext === m_1_new) {
        mon_date_nextnext = mon_date_new + 7;
    } else {
        mon_date_nextnext = mon_date_new + 7 - dates[m_1_new-1];
    }

    var res = String(m_1)+String(mon_date);
    var resn = String(m_1_new) + String(mon_date_new);
    var resnxtnxt = String(m_1_nextnext) + String(mon_date_nextnext);

    return {res, resn, resnxtnxt, m_1, mon_date, m_2, fri_date, m_1_new, mon_date_new, m_2_new, fri_date_new};
}