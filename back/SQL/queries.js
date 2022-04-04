const date = `DATE_FORMAT(board_date, '%Y-%m-%d') AS board_date`
const datetime = `DATE_FORMAT(board_date, '%Y-%m-%d %h:%i:%s') AS board_date`
const cmtDate = `DATE_FORMAT(cmt_date, '%Y-%m-%d %h:%i:%s') AS cmt_date`
const param = `board_idx,show_category_idx, board_subject, board_content, board_hit`


module.exports = {
    //account
    myInfo: `SELECT 
    u_name, 
    DATE_FORMAT(u_dob, '%Y-%m-%d') AS u_dob,
    u_gender,
    u_mobile,
    u_address_idx
FROM u_personal 
WHERE user_idx = ?`,
    optionalInfo: 'INSERT INTO u_personal (user_idx, u_name, u_dob, u_gender, u_mobile) VALUES (?,?,?,?,?)',
    myBenefit: 'SELECT * from u_point WHERE user_idx = ?',





    //member
    idCheck: 'SELECT user_id FROM user where user_id=?',
    NickNameCheck: 'SELECT * FROM user WHERE user_nickname = ?',
    signUp: 'INSERT INTO user (user_id,user_password,user_nickname) VALUES (?,?,?)',
    signIn: `SELECT 
    user_idx,
    user_id,
    user_password,
    user_nickname,
    DATE_FORMAT(user_doj,'%Y-%m-%d') AS user_doj,
    user_level,
    user_active
  FROM user 
  WHERE user_id = ? AND user_password = ?`,







    //board


    communityList1: `SELECT ${param},${date} FROM board WHERE (show_category_idx = ?) ORDER BY board_idx DESC`,
    communityList2: `SELECT ${param},${date} FROM board WHERE (show_category_idx = ? OR show_category_idx = ?) ORDER BY board_idx DESC`,
    communityList3: `SELECT ${param},${date} FROM board WHERE (show_category_idx = ? OR show_category_idx = ? OR show_category_idx = ? ) ORDER BY board_idx DESC`,
    communityList4: `SELECT ${param},${date} FROM board WHERE (show_category_idx = ? OR show_category_idx = ? OR show_category_idx = ? OR show_category_idx = ? ) ORDER BY board_idx DESC`,
    getCategoryIdx: 'SELECT show_category_idx FROM s_category WHERE show_category = ?',

    communityWrite: 'INSERT INTO board(user_idx,board_subject,board_content,show_category_idx) VALUES(?,?,?,?)',

    communityWriteFile: `INSERT INTO b_file (
        board_idx,
        file_originalname,
        file_storedname,
        file_size,
        file_date,
        file_dlt_flag
        )
VALUES(?,?,?,?,?,?)`,

    updateHit: 'UPDATE board SET board_hit = board_hit + 1 WHERE board_idx = ?',
    communityViewFile: `SELECT
                a.board_idx, a.user_idx, a.show_category_idx, a.board_subject, a.board_content, a.board_date, a.board_hit,
                b.board_file_idx, b.board_idx, b.file_originalname, b.file_storedname, b.file_size, b.file_date, b.file_dlt_flag
                ,${datetime} 
                FROM board AS a LEFT OUTER JOIN b_file AS b 
                ON a.board_idx = b.board_idx 
                WHERE a.board_idx = ?`,
    communityDelete: 'DELETE FROM board WHERE board_idx = ? ',

    getCategory: 'SELECT * FROM s_category WHERE show_category = ?',
        communityUpdate: 'UPDATE board SET board_subject=?, board_content=?, show_category_idx=? WHERE board_idx=?',
        communityUpdateFile: `UPDATE b_file SET 
        file_originalname = ?,
        file_storedname = ?,
        file_size = ?,
        file_date = ?,
        WHERE
        board_idx = ?
        `,


        commentWrite: 'INSERT INTO comment(user_idx, board_idx, cmt_content) VALUES(?,?,?)',
        commentList: 'SELECT * FROM comment WHERE board_idx = ?'



    //show

}