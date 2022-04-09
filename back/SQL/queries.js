
const date = `DATE_FORMAT(board_date, '%Y-%m-%d') AS board_date`
const rDate = `DATE_FORMAT(review_date, '%Y-%m-%d') AS review_date`
const datetime = `DATE_FORMAT(board_date, '%Y-%m-%d %h:%i:%s') AS board_date`
const rDatetime = `DATE_FORMAT(review_date, '%Y-%m-%d %h:%i:%s') AS review_date`
const cmtDate = `DATE_FORMAT(cmt_date, '%Y-%m-%d %h:%i:%s') AS cmt_date`
const bparam = `board_idx,b.user_idx,show_category_idx, board_subject, board_content, board_hit`
const uparam = `u.user_idx,user_nickname,user_level`
const rparam = `review_idx,r.user_idx,show_category, review_subject, review_content, review_hit`

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
    
    myBenefit: `SELECT u_point_idx, user_idx, DATE_FORMAT(u_point_date, '%Y-%m-%d') AS u_point_date, u_point_description, u_point_in, u_point_out, u_point_in - u_point_out AS u_point_net
                FROM u_point 
                WHERE user_idx = ?`,
                
    getPersonalInfo: `SELECT * 
    FROM u_personal AS p
    LEFT OUTER JOIN u_mobile AS m 
    ON p.u_mobile_idx = m.u_mobile_idx AND p.user_idx = ?`,


    //유저 이미지 넣기
    insertUserImg: `INSERT INTO u_file (user_idx, file_originalname, file_storedname, file_size, file_dlt_flag)
                    VALUES (?, ?, ?, ?, ?)`,




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
    communityList: `SELECT board_idx, b.show_category_idx, board_subject, board_content, board_hit,${date}, show_category
    FROM board As b
    LEFT OUTER JOIN s_category AS s
    ON b.show_category_idx = s.show_category_idx
    ORDER BY board_idx DESC`,


    admin: `INSERT INTO user VALUE ('admin@gmail.com','admin','관리자',2,1,now(),130)`,

    communityList1: `SELECT ${bparam},${uparam},${date} FROM board AS b LEFT OUTER JOIN user AS u ON b.user_idx = u.user_idx WHERE show_category_idx = 1 ORDER BY board_idx DESC`,
    communityList2: `SELECT ${bparam},${uparam},${date} FROM board AS b LEFT OUTER JOIN user AS u ON b.user_idx = u.user_idx WHERE show_category_idx = 2 ORDER BY board_idx DESC`,
    communityList3: `SELECT ${bparam},${uparam},${date} FROM board AS b LEFT OUTER JOIN user AS u ON b.user_idx = u.user_idx WHERE show_category_idx = 3 ORDER BY board_idx DESC`,
    communityList4: `SELECT ${bparam},${uparam},${date} FROM board AS b LEFT OUTER JOIN user AS u ON b.user_idx = u.user_idx WHERE show_category_idx = 4 ORDER BY board_idx DESC`,
    getCategoryIdx: 'SELECT show_category_idx FROM s_category WHERE show_category = ?',
    allListsql: `SELECT *,${date}
    FROM board AS b 
    LEFT OUTER JOIN user AS u 
    ON b.user_idx = u.user_idx 
    ORDER BY b.board_idx DESC`,

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
    getFullCategories: 'SELECT * FROM s_category ORDER BY show_category_idx',


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
    
    communityLikeUp1: 'UPDATE like_board SET like_board_flag = 1 WHERE board_idx = ?',
    communityLikeUp0: 'UPDATE like_board SET like_board_flag = 0 WHERE board_idx = ?',
    communityLikeInsert: 'INSERT INTO like_board (user_idx, board_idx) VALUES(?,?)',
    communityLikeList: 'SELECT * FROM like_board WHERE board_idx = ?',

    //review
    reviewList: `SELECT review_idx, b.show_category, review_subject, review_content, review_hit,${date},
    FROM b_review As r
    LEFT OUTER JOIN s_category AS s
    ON b.show_category = s.show_category_idx
    ORDER BY review_idx DESC`,

    reviewList1: `SELECT ${rparam},${uparam},${rDate} FROM b_review AS r LEFT OUTER JOIN user AS u ON r.user_idx = u.user_idx WHERE show_category = 1 ORDER BY review_idx DESC`,
    reviewList2: `SELECT ${rparam},${uparam},${rDate} FROM b_review AS r LEFT OUTER JOIN user AS u ON r.user_idx = u.user_idx WHERE show_category = 2 ORDER BY review_idx DESC`,
    reviewList3: `SELECT ${rparam},${uparam},${rDate} FROM b_review AS r LEFT OUTER JOIN user AS u ON r.user_idx = u.user_idx WHERE show_category = 3 ORDER BY review_idx DESC`,
    reviewList4: `SELECT ${rparam},${uparam},${rDate} FROM b_review AS r LEFT OUTER JOIN user AS u ON r.user_idx = u.user_idx WHERE show_category = 4 ORDER BY review_idx DESC`,
    reviewGetCategoryIdx: 'SELECT show_category_idx FROM s_category WHERE show_category = ?',
    allReviewListsql: `SELECT *,${rDate}
    FROM b_review AS r 
    LEFT OUTER JOIN user AS u 
    ON r.user_idx = u.user_idx 
    ORDER BY r.review_idx DESC`,

    reviewWrite: 'INSERT INTO b_review(user_idx,review_subject,review_content,show_category) VALUES(?,?,?,?)',

//     reviewWriteFile: `INSERT INTO b_file (
//         board_idx,
//         file_originalname,
//         file_storedname,
//         file_size,
//         file_date,
//         file_dlt_flag
//         )
// VALUES(?,?,?,?,?,?)`,

    reviewUpdateHit: 'UPDATE b_review SET review_hit = review_hit + 1 WHERE review_idx = ?',
    // reviewViewFile: `SELECT
    //             r.user_idx, r.show_category, r.review_subject, r.review_content, r.review_date, r.review_hit,
    //             f.board_file_idx, f.board_idx, f.file_originalname, f.file_storedname, f.file_size, f.file_date, f.file_dlt_flag
    //             ,${datetime},
    //             u.user_id, u.user_nickname, u.user_level, u.user_active, u.user_doj
    //             FROM board AS b 
    //             LEFT OUTER JOIN b_file AS f
    //             ON b.board_idx = f.board_idx 
    //             LEFT OUTER JOIN user AS u 
    //             ON b.user_idx = u.user_idx 
    //             WHERE b.board_idx = ?`,
    reviewView: `SELECT
                r.user_idx, r.show_category, r.review_subject, r.review_content, r.review_date, r.review_hit,
                ,${rDatetime},
                u.user_id, u.user_nickname, u.user_level, u.user_active, u.user_doj
                FROM b_review AS r
                LEFT OUTER JOIN user AS u 
                ON r.user_idx = u.user_idx 
                WHERE r.review_idx = ?`,

    reviewDelete: 'DELETE FROM b_review WHERE review_idx = ? ',
    reviewGetCategory: 'SELECT * FROM s_category WHERE show_category = ?',
    reviewGetCategories: 'SELECT * FROM s_category ORDER BY show_category_idx',
    getFullCategories: 'SELECT * FROM s_category ORDER BY show_category_idx',


    reviewUpdate: 'UPDATE b_review SET review_subject=?, review_content=?, show_category=? WHERE review_idx=?',
    // reviewUpdateFile: `UPDATE b_file SET 
    //     file_originalname = ?,
    //     file_storedname = ?,
    //     file_size = ?,
    //     file_date = ?,
    //     WHERE
    //     board_idx = ?
    //     `,


    // commentRWrite: 'INSERT INTO comment(user_idx, board_idx, cmt_content) VALUES(?,?,?)',
    // commentRList: `SELECT cmt_idx,board_idx, c.user_idx, user_id, user_nickname, user_level, cmt_content, ${cmtDate}, cmt_update_flag
    //     FROM comment AS c 
    //     LEFT OUTER JOIN user AS u
    //     ON c.user_idx = u.user_idx
    //     WHERE c.board_idx = ?
    //      `,



    // commentRDelete: 'DELETE FROM comment WHERE cmt_idx = ? ',
    // commentRUp: 'UPDATE comment SET cmt_content=? WHERE cmt_idx = ?',
    
    // reviewLikeUp1: 'UPDATE like_board SET like_board_flag = 1 WHERE board_idx = ?',
    // reviewLikeUp0: 'UPDATE like_board SET like_board_flag = 0 WHERE board_idx = ?',
    // reviewLikeInsert: 'INSERT INTO like_board (user_idx, board_idx) VALUES(?,?)',
    // reviewLikeList: 'SELECT * FROM like_board WHERE board_idx = ?',

    //show

    showList : 'SELECT * FROM shows AS s LEFT OUTER JOIN s_category AS c ON s.show_category_idx = c.show_category_idx',
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
        VALUES (?,?,?,?,?)`,


    showView: `SELECT s.show_idx, s.show_title, c.show_category, s.show_category_idx, s.show_xrated, s.show_company, s.show_director, s.show_content, s.show_date_open, o.show_date, o.show_place, o.show_cast1, o.show_cast2 
    FROM shows AS s 
    LEFT OUTER JOIN s_option AS o 
    ON s.show_idx = o.shows_idx
    LEFT OUTER JOIN s_category as c
    ON s.show_category_idx = c.show_category_idx
    WHERE s.show_idx= ? `,

    showUpdate : `UPDATE shows AS s 
    INNER JOIN s_option AS o
    ON s.show_idx = o.shows_idx AND s.show_idx = ?
    SET s.show_title=?,
        s.show_category_idx=?,
        s.show_xrated=?,
        s.show_company=?,
        s.show_director=?,
        s.show_date_open=?,
        s.show_content=?,
        o.show_date=?,
        o.show_place=?,
        o.show_cast1=?,
        o.show_cast2=?`,

    ticketOpenDate: `SELECT show_title, show_company, DATE_FORMAT(show_date_open,'%Y-%m-%d %h:%i:%s') AS show_date_open FROM shows`,


    //admin


    insertPoint: `INSERT INTO u_point (user_idx, u_point_in, u_point_out, u_point_description) 
                    VALUES (?, ?, ?, ?)`,
    
    updatePoint: `UPDATE u_point SET u_point_in = ?, u_point_out =? , u_point_description = ?
                    WHERE u_point_idx = ?`,

    deletePoint: `DELETE FROM u_point WHERE u_point_idx = ?`,


 


    selectBookInfo: `SELECT s.show_category_idx, s.show_title, s.show_xrated, s.show_company, o.show_date, o.show_place
    FROM shows AS s
    LEFT OUTER JOIN s_option AS o
    ON s.show_idx = o.shows_idx
    WHERE s.show_idx
    `,

    InsertBookInfo: `INSERT INTO `,

    
    //payment
    myBenefit: `SELECT u_point_idx, user_idx, DATE_FORMAT(u_point_date, '%Y-%m-%d') AS u_point_date, u_point_description, u_point_in, u_point_out, u_point_in - u_point_out AS u_point_net
                FROM u_point 
                WHERE user_idx = ?`,
    checkPoint: `SELECT user_idx, SUM(u_point_in) AS sum_p_in, SUM(u_point_out) As sum_p_out FROM u_point WHERE user_idx = ? GROUP BY user_idx`,




    }