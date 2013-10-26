"""
	Cumulus.af Python Rewrite
	~~~~~~~~~~~~~~~~~~~~~~~~~

	:copyright: (c) 2013

"""
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash, _app_ctx_stack

# Configuration
DB = 'db/cumulus.db'
DEBUG = True
SECRET_KEY = 'dev key'
USERNAME = 'admin'
PASSWORD = 'default'

app = Flask(__name__)
app.config.from_object(__name__)

def get_db():
    """Opens db connection if none."""
    top = _app_ctx_stack.top
    if not hasattr(top, 'sqlite_db'):
        sqlite_db = sqlite3.connect(app.config['DB'])
        sqlite_db.row_factory = sqlite3.Row
        top.sqlite_db = sqlite_db
    return top.sqlite_db

@app.route("/")
def files():
	db = get_db()
	cur = db.execute('select * from files order by uploaded_at desc')
	files = cur.fetchall()
	return_vals = {
		'files': files,
		'title': 'Cumulus.af',
		'used_space': '500',
		'aggregated_space': '10.58',
	}
	return render_template('files.html', return_vals=return_vals)

@app.route("/add", methods=['POST'])
def add_file():
	# db = get_db()
	return redirect(url_for('files'));

if __name__ == "__main__":
	app.run(debug=True)