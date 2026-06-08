import os
from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        # 暗号化の秘密鍵、あとで強力なものに変える必要ある
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'tumikin.sqlite'),
    )
    
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)
    #データベース保存用のフォルダを安全に自動作成する仕掛け
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/hello')
    def hello():
        return '積筋アプリ、起動成功！'
    
    from . import db
    db.init_app(app)
    
    return app