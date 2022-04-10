카테고리 셋팅
INSERT INTO s_category(show_category) VALUES ('Classic');
INSERT INTO s_category(show_category) VALUES ('Musical');
INSERT INTO s_category(show_category) VALUES ('Opera');
INSERT INTO s_category(show_category) VALUES ('Ballet');
INSERT INTO s_category(show_category) VALUES ('Etc');




INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,4,'오페라1');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,4,''오페라2');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,4,''오페라3');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,4,''오페라4');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,4,''오페라5');

INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,2,'클래식1');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,2,'클래식2');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,2,'클래식3');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,2,'클래식4');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,2,'클래식5');

INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,3,'뮤지컬1');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,3,'뮤지컬2');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,3,'뮤지컬3');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,3,'뮤지컬4');
INSERT INTO board (user_idx,show_category_idx,board_subject) VALUES(1,3,'뮤지컬5');

SELECT * FROM board

AS board LEFT OUTER JOIN s_category AS s

ON board.show_category_idx = s.show_category;




//좌석
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (1,1,100000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (1,2,100000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (1,3,100000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (1,4,100000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (1,5,100000);



INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (2,1,75000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (2,2,75000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (2,3,75000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (2,4,75000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (2,5,75000);


INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (3,1,50000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (3,2,50000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (3,3,50000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (3,4,50000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (3,5,50000);

INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (4,1,30000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (4,2,30000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (4,3,30000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (4,4,30000);
INSERT INTO book_seat (book_seat_row,  book_seat_number, book_seat_price) VALUES (4,5,30000);



INSERT INTO bank (bank_account, bank_number) VAlUES ('신한은행',110502607216);
INSERT INTO bank (bank_account, bank_number) VAlUES ('카카오뱅크',3333101822445);
INSERT INTO bank (bank_account, bank_number) VAlUES ('하나은행',59991031852507);


//좌석 정보 업뎃
UPDATE book_seat SET book_seat_row = 3 WHERE book_seat_price = 50000;



INSERT INTO u_mobile (u_mobile1, u_mobile2, u_mobile3, user_idx) VALUES (010,5555,5555, 130);
INSERT INTO u_address (u_add_region1, u_add_region2, u_add_region3, u_add_road, u_add_bd_name,u_add_bd_no, u_add_zipcode, u_add_name, u_add_detail, user_idx)
VALUES ('서울','강동구','천호동','천호대로', '금복빌딩', '995', 05248, '서울 강동구 천호대로 995', '3층', 130);

INSERT INTO u_personal (user_idx,u_name,u_dob,u_gender,u_mobile_idx,u_address_idx) VALUES (129,'김졸림',now(),0,23,21);