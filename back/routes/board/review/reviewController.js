const pool = require('../../../db');
let sql = require('../../../SQL/queries.js')


let response = {
result: [],
errno: 1
};

let listsql 
exports.reviewList = async (req, res) => {
    const {category} = req.body;
    const prepare = [category]

    const [result1] = await pool.execute(sql.reviewGetCategoryIdx,prepare)
    const showIdx = result1[0].show_category_idx
    try {
        switch (showIdx){
            case 1:
                listsql = sql.reviewList1;
            break;
            case 2:
                listsql = sql.reviewList2;
            break;
            case 3:
                listsql = sql.reviewList3;
            break;
            case 4:
                listsql = sql.reviewList4;
            break;
            case 5:
                listsql = sql.allReviewListsql;
            break;

        }
        const [result] = await pool.execute(listsql);
                response = {
                    ...response,
                    result,
                    errno: 0
                } 

    } catch (e) {
        console.log('/reviewlist',e.message);
    }
    res.json(response);
}



exports.reviewWrite = async (req,res) =>{                                
    const { category, userIdx,subject,content }=req.body;
    console.log(req.body)
    const categoryIdx = `SELECT show_category_idx FROM s_category WHERE show_category = ?`
    const prepare = [category]

    const [result1] = await pool.execute(categoryIdx,prepare);
   
    const cIdx = result1[0].show_category_idx;
    const prepare2 = [userIdx,subject,content,cIdx];

    try{
        const [result] = await pool.execute(sql.reviewWrite,prepare2);
        response = {
            result:{
                row:result.affectedRows,
                insertId:result.insertId
            },
            errno:0    
        };
        res.json(response)
        
        // const fileOriginalname = req.file.originalname;
        // const fileStoredname = req.file.filename;
        // const fileSize = req.file.size;
        // const fileDate = new Date();
        // const fileDltF = '0';
        // const boardIdx = result.insertId;
        // const fPrepare = [boardIdx,fileOriginalname,fileStoredname,fileSize,fileDate,fileDltF];                   

        // if(req.file.size > 0){

        //     const [result2] = await pool.execute(sql.reviewWriteFile,fPrepare);
        //     response = {
        //         result:{
        //             row:result2.affectedRows,
        //             insertId:result2.insertId
        //         },
        //         errno:0    
        //     };
            
        // };

    }catch(e){
        console.log('/reviewwrite',e.message);
    };
}

exports.reviewView = async (req,res) => {

    const{ boardIdx }=req.params;
    const prepare = [ boardIdx ];
    const hitResult = await pool.execute(sql.reviewUpdateHit,prepare);

    try{
        const [ result ] = await pool.execute(sql.reviewView,prepare);
        response = {
            result,
            errno:0
        };
        res.json(response);
    } catch(e) {
        console.log('/reviewview',e.message);
    };

}

exports.reviewDelete = async (req,res) =>{
    const{ boardIdx }=req.params;
    const prepare = [ boardIdx ];

    try{
        const [result] = await pool.execute(sql.reviewDelete,prepare);
        console.log(result)
        response = {
                result,
                errno:0
            };
        res.json(response);
       
    } catch (e) {
        console.log('reviewdelete',e.message);
        
    };
   
}

exports.reviewUpdate = async (req,res)=>{
    const{boardIdx}=req.params;
    const prepare1 = [ req.body.select ];
    const [[getCategory]] = await pool.execute(sql.reviewGetCategory,prepare1);

    const {subject,content}=req.body;
    const categoryIdx = getCategory.show_category_idx
    const prepare2 = [subject,content,categoryIdx,boardIdx];

    try{
        const [result1] = await pool.execute(sql.reviewUpdate,prepare2);
        const response = {
            result:{
                row:result1.affectedRows,
                insertId:result1.insertId
            },
            errno:0    
        };
        res.json(response);

    }catch(e){
        console.log('reviewupdate',e.message);
    }
}

// exports.reviewComment = async (req,res)=>{
//     const{ boardIdx }=req.params;
//     const { userIdx, ccontent } = req.body
//     const prepare = [userIdx,boardIdx,ccontent]
    
//     try{
//         const [result] = await pool.execute(sql.commentWrite,prepare);
//         response = {
//             ...response,
//             result: {
//                 affectedRows: result.affectedRows,
//                 insertId: result.insertId,
//             },
//             errno: 0
//         }
        

//     }catch(e){
//         console.log('reviewcontent',e.message)
//     }
//     res.json(response)
    

//     // const cListSql = `SELECT *,${cmtDate} FROM comment WHERE board_idx = ${idx}`
//     // const clistResult = await pool.execute(cListSql)
// }

// exports.reviewCoList = async (req,res)=>{
//     const {boardIdx}=req.params;
//     const prepare = [boardIdx]

//     // const boardIdxPre = idx;
//     // const cmtListSql = `SELECT * FROM comment WHERE board_idx = ${idx}`

//     try{
//         const [cmtList] = await pool.execute(sql.commentList,prepare)
//         response = {
//             ...response,
//             cmtList,
//             errno: 0
//         }   
//     }catch(e){
//         console.log('reviewcolist',e.message)
//     }
//     res.json(response)
    
// }

// exports.reviewCoDlt = async (req,res)=>{
//     const{cmtIdx}=req.params;
//     const prepare = [cmtIdx];
//     try{
//         const [result] = await pool.execute(sql.commentDelete,prepare);
//         response = {
//                 result,
//                 errno:0
//             };
//         res.json(response);
//     } catch (e) {
//         console.log('commentdelete',e.message);
//     };
    
// }

// exports.reviewCoUp = async (req,res)=>{
//     const{cmtIdx}=req.params;
//     const {updateComment} = req.body
//     const prepare = [updateComment,cmtIdx]
//     try{
//         const [result] = await pool.execute(sql.commentUp,prepare);
//         response = {
//             ...response,
//             result: {
//                 affectedRows: result.affectedRows,
//                 insertId: result.insertId,
//             },
//             errno: 0
//         }
       
//     }catch(e){
//         console.log('/commentup',e.message)
//     }
    
// }



// let likeup
// exports.reviewLikeUp = async (req,res)=>{
//     const{boardIdx}=req.params;
//     const { likeUserIdx } = req.body
//     const prepare = [boardIdx]
//     const flag = req.body.likedata.result[0].like_board_flag
//     try{
//         if(flag == '0'){
//             likeup = sql.reviewLikeUp1
//         } else{
//             likeup = sql.reviewLikeUp0
//         }

//         const [result] = await pool.execute(likeup,prepare) 
//         response1 = {
//             ...response,
//             result,
//             errno: 0
//         }   
//     }catch(e){
//         console.log('reviewLike',e.message)
//     }
//     res.json(response1)
    
// }

// exports.reviewLikeInsert = async (req,res)=>{
//     const{boardIdx}=req.params;
//     const { likeUserIdx } = req.body
//     const prepare = [likeUserIdx,boardIdx]

//     try{
        
//         const [result] = await pool.execute(sql.reviewLikeInsert,prepare)
//         response = {
//             ...response,
//             result,
//             errno: 0
//         } 
        

//     }catch(e){
//         console.log('/likeinsert',e.message)
//     }
//     res.json(response)
// }

// exports.reviewLikeList= async (req,res)=>{
//     const{boardIdx}=req.params;
//     const prepare = [boardIdx]
    
//     try{
//         const [result] = await pool.execute(sql.reviewLikeList,prepare)
//         const length = result.length
//         response = {
//             ...response,
//             result:{
//                 result,
//                 length
//             },
//             errno: 0
//         }  
//     }catch(e){
//         console.log('reviewLikeList',e.message)
//     }
//     res.json(response)
// }
