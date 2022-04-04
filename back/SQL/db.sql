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