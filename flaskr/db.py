import sqlite3
import click
from flask import current_app, g

# 🔌 ① データベースに接続する関数
def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

# 🔒 ② アプリが終わったら接続を閉じる関数
def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

# 🔨 ③ 設計図（schema.sql）を読み込んでデータベースを初期化する関数
def init_db():
    db = get_db()

    # 一番外側（本拠地）にある schema.sql を開いて読み込む
    with current_app.open_resource('../schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

# 💻 ④ コマンドプロンプトから「flask init-db」と打って実行できるようにするコマンド
@click.command('init-db')
def init_db_command():
    init_db()
    click.echo('データベースの初期化が完了しました！（tumikin.sqliteが誕生しました）')

# 🚀 ⑤ このdb機能をFlaskアプリに登録する関数
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)