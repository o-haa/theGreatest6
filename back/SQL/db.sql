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