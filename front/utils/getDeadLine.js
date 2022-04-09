export const deadLine = _=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `${year}년 ${month}월 ${day}일 11시59분`
    return today;
}


