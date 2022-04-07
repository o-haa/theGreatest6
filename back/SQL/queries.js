const { getMaxListeners } = require("../db")

const date = `DATE_FORMAT(board_date, '%Y-%m-%d') AS board_date`
const datetime = `DATE_FORMAT(board_date, '%Y-%m-%d %h:%i:%s') AS board_date`
const cmtDate = `DATE_FORMAT(cmt_date, '%Y-%m-%d %h:%i:%s') AS cmt_date`
const param = `board_idx,show_category_idx, board_subject, board_content, board_hit`
const bparam = `board_idx,b.user_idx,show_category_idx, board_subject, board_content, board_hit`
const uparam = `u.user_idx,user_nickname,user_level`

module.exports = {
    //account
    personalInfo: `SELECT 
    u_name, 
    DATE_FORMAT(u_dob, '%Y-%m-%d') AS u_dob,
    u_gender,
    a.u_add_name,
    a.u_add_bd_name,
    a.u_add_detail,
    a.u_add_zipcode,
    m.u_mobile1,
    m.u_mobile2,
    m.u_mobile3
FROM u_personal AS p
LEFT OUTER JOIN u_address AS a
ON p.u_address_idx = a.user_address_idx
LEFT OUTER JOIN u_mobile AS m
ON p.u_mobile_idx = m.u_mobile_idx
WHERE p.user_idx = ?`,


    mobileInfo: `INSERT INTO u_mobile (u_mobile1, u_mobile2, u_mobile3, user_idx ) VALUES (?,?,?,?)`,

    addressInfo: `INSERT INTO u_address (user_idx,u_add_name, u_add_region1,u_add_region2, u_add_region3, u_add_road, u_add_bd_name, u_add_bd_no, u_add_detail, u_add_zipcode)
    VALUES (?,?,?,?,?,?,?,?,?,?)`,


    optionalInfo: 'INSERT INTO u_personal (user_idx, u_name, u_dob, u_gender, u_mobile_idx, u_address_idx) VALUES (?,?,?,?,?,?)',
    
    myBenefit: `SELECT user_idx, DATE_FORMAT(u_point_date, '%Y-%m-%d') AS u_point_date, u_point_description, u_point_in, u_point_out, u_point_net  
                FROM u_point 
                WHERE user_idx = ?`,



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


    listsql: `SELECT * 
    FROM board AS b 
    LEFT OUTER JOIN user AS u 
    ON b.user_idx = u.user_idx 
    WHERE b.show_category_idx = ? 
    ORDER BY b.board_idx DESC`,



    // WHERE s.show_category = ?

    communityList: `SELECT board_idx, b.show_category_idx, board_subject, board_content, board_hit,${date}, show_category
    FROM board As b
    LEFT OUTER JOIN s_category AS S
    ON b.show_category_idx = s.show_category_idx
    ORDER BY board_idx DESC`,


    admin: `INSERT INTO user VALUE ('admin@gmail.com','admin','관리자',2,1,now(),130)`,

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
                b.user_idx, b.show_category_idx, b.board_subject, b.board_content, b.board_date, b.board_hit,
                f.board_file_idx, f.board_idx, f.file_originalname, f.file_storedname, f.file_size, f.file_date, f.file_dlt_flag
                ,${datetime},
                u.user_id, u.user_nickname, u.user_level, u.user_active, u.user_doj
                FROM board AS b 
                LEFT OUTER JOIN b_file AS f
                ON b.board_idx = f.board_idx 
                LEFT OUTER JOIN user AS u 
                ON b.user_idx = u.user_idx 
                WHERE b.board_idx = ?`,

    communityDelete: 'DELETE FROM board WHERE board_idx = ? ',
    getCategory: 'SELECT * FROM s_category WHERE show_category = ?',
    getCategories: 'SELECT * FROM s_category ORDER BY show_category_idx',



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
    commentList: `SELECT cmt_idx,board_idx, c.user_idx, user_id, user_nickname, user_level, cmt_content, ${cmtDate}, cmt_update_flag
        FROM comment AS c 
        LEFT OUTER JOIN user AS u
        ON c.user_idx = u.user_idx
        WHERE c.board_idx = ?
         `,



    commentDelete: 'DELETE FROM comment WHERE cmt_idx = ? ',
    commentUp: 'UPDATE comment SET cmt_content=? WHERE cmt_idx = ?',

    //show

    showWrite: `INSERT INTO shows(
        show_title,
        show_category_idx,
        show_xrated,
        show_company,
        show_director,
        show_like,
        show_date_open,
        show_content
        ) VALUES( ?,?,?,?,?,1,?,? )`,

    showOption: `INSERT
        INTO s_option(shows_idx, show_date, show_place, show_cast1, show_cast2)
        VALUES (?,?,?,?,?)`
}
