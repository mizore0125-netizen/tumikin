from flask import Blueprint, flash, g, redirect, render_template, request, session, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flaskr.db import get_db


# 🧱「認証・ログイン機能」という専用の独立した部屋（部品）を作る
bp = Blueprint('auth', __name__, url_prefix='/auth')