

const pntInsertBtn = document.querySelector('#insertBtn')
const pntUpdateBtn = document.querySelector('#updateBtn')
const pntDeleteBtn = document.querySelector('#deleteBtn')



pntInsertBtn.addEventListener('click', insertBtnHandler)
async function insertBtnHandler() {
    try {
        const data = {
            user_idx,
            pointIn,
            pointOut,
            pointDescription
        }
        const insertPoint = await axios.post('http://localhost:4001/admin/insertpoint', data)
        console.log(insertPoint.data)
    } catch (e) {
        console.log('/AdmBenefitMgt', e.message)
        location.href = '/account/management/myBenefit'
    }
}


pntUpdateBtn.addEventListener('click', updateBtnHandler)

async function updateBtnHandler() {
    try {
        const data = {
            pointIdx,
            userIdx,
            pointIn,
            pointOut,
            pointDescription
        }
        const updatePoint = await axios.post('http://localhost:4001/admin/updatepoint', data)
        console.log(updatePoint.data)
        location.href = '/account/management/myBenefit'
    } catch (e) {
        console.log('/AdmBenefitMgt', e.message)
    }
}

pntDeleteBtn.addEventListener('click', deleteBtnHandler)
async function deleteBtnHandler() {
    try {
        const data = {
            pointIdx,
        }
        const updatePoint = await axios.post('http://localhost:4001/admin/deletepoint', data)
        console.log(deletePoint.data)
        location.href = '/account/management/myBenefit'
    } catch (e) {
        console.log('/AdmBenefitMgt', e.message)
    }
}