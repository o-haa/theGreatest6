

const pntInsertBtn = document.querySelector('#insertBtn')

pntInsertBtn.addEventListener('click',inserBtnHandler)

async function insertBtnHandler() {
    try {
        const data = {
            user_idx,
            pointIn,
            pointOut,
            pointDescription
        }
        const insertPoint = await axios.post('http://localhost:4001/admin/benefitmgt', data)
        console.log(insertPoint.data)
    } catch (e) {
        console.log('/AdmBenefitMgt', e.message)
    }

}
