/* 👤 ユーザー情報を入れる箱（ログイン用） */
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

/* 🏋️‍♂️ 積筋専用！筋トレの記録を保存する箱 */
CREATE TABLE post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL, /* ここに「背中 / 懸垂 / 10回」のようなデータが入ります */
    FOREIGN KEY (author_id) REFERENCES user (id)
);