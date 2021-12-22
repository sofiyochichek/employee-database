from flask import Flask, jsonify, request
from flask.wrappers import Request
import pymysql
from pymysql.cursors import DictCursor

app = Flask(__name__, static_folder="static")

# Соединение с базой данных
dbh = pymysql.connect(
    host='185.12.94.106',
    user='2p1s12',
    password='643-764-614',
    db='2p1s12',
    charset='utf8mb4',
    cursorclass=DictCursor,
    autocommit=True
)

@app.route('/')
def index():
    index = open('index.html', 'r')
    page = index.read()
    index.close()
    return page

@app.route('/create_company')
def create_company():
    index = open('create_company.html', 'r')
    page = index.read()
    index.close()
    return page

@app.route('/get_sfear_list')
def get_sfear_list():
    try:
        with dbh.cursor() as cur:
            cur.execute('SELECT * FROM `web_sfear`')
            rows = cur.fetchall()
    except:
        rows = {'error': 'Ошибка чтения сфер'}

    return jsonify(rows)

@app.route('/get_company_list')
def get_company_list():
    try:
        with dbh.cursor() as cur:
            cur.execute('SELECT c.id, c.name, c.phone, s.name as s_name FROM web_companies as c, web_sfear as s WHERE c.web_sfear_id=s.id;')
            rows = cur.fetchall()
    except:
        rows = {'error': 'Ошибка чтения компаний'}

    return jsonify(rows)

@app.route('/get_company', methods=['POST'])
def get_company():
    id=request.form.get('id')
    try:
        with dbh.cursor() as cur:
            cur.execute('SELECT c.id as id, c.name as name, c.phone as phone, c.web_sfear_id as sf_id, s.name as s_name FROM web_companies as c, web_sfear as s WHERE c.web_sfear_id=s.id  AND c.id='+str(id)+';')
            rows = cur.fetchall()
            out_data={
                'status': 'ok',
                'company': rows[0]
            }
    except:
        out_data={
                'status': 'error',
            }

    return jsonify(out_data)

@app.route('/get_employee', methods=['POST'])
def get_employee():
    id=request.form.get('id')
    try:
        with dbh.cursor() as cur:
            cur.execute('SELECT e.id as id, e.f as f, e.i as i, e.phone as phone, e.email as email,  e.web_companies_id as com_id, c.name as c_name, e.position as position FROM web_employee as e, web_companies as c WHERE e.web_companies_id=c.id AND e.id='+str(id)+';')
            rows = cur.fetchall()
            out_data={
                'status': 'ok',
                'employee': rows[0]
            }
    except:
        out_data={
                'status': 'error',
            }

    return jsonify(out_data)

@app.route('/get_employee_list')
def get_employee_list():
    try:
        with dbh.cursor() as cur:
            cur.execute('SELECT e.id, e.f, e.i, e.phone, e.email, c.name as c_name, e.position FROM web_employee as e, web_companies as c WHERE e.web_companies_id=c.id;')
            rows = cur.fetchall()
    except:
        rows = {'error': 'Ошибка чтения сотрудников'}

    return jsonify(rows)

@app.route('/save_employee', methods=['POST'])
def save_employee():
    id=int(request.form.get('id'))
    f=request.form.get('f')
    i=request.form.get('i')
    phone=request.form.get('phone')
    email=request.form.get('email')
    c_name=request.form.get('c_name')
    position=request.form.get('position')
    print('id:', id, 'f: ', f, 'i: ', i, 'phone: ', phone, 'email: ', email, 'c_name: ', c_name, 'position: ', position)
    if id>0:
        sql = f"UPDATE web_employee set f='{f}', i='{i}', phone='{phone}', email='{email}', web_companies_id='{c_name}', position='{position}' WHERE id='{id}'"
    else: 
        sql = f"INSERT INTO `web_employee` (`f`, `i`, `web_companies_id`, `phone`, `email`, `position`) VALUES ('{f}', '{i}', '{c_name}', '{phone}', '{email}', '{position}');"
    try:
        with dbh.cursor() as cur:
            cur.execute(sql)
            out_data={
                'status': 'ok',
            }
    except:
        out_data={
                'status': 'error',
            }
    return jsonify(out_data)

@app.route('/delete_employee', methods=['POST'])
def delete_employee():
    out_data={'status':'error'}
    id = request.form.get('id')

    if int(id)>0:
        try:
            with dbh.cursor() as cur:
                cur.execute('delete from web_employee where id = "'+str(id)+'"')
                out_data = {
                    'status': 'ok'
                }
        except:
            out_data={
                'status': 'error'
            }
    return jsonify(out_data)

@app.route('/delete_company', methods=['POST'])
def delete_company():
    out_data={'status':'error'}
    id = request.form.get('id')

    if int(id)>0:
        try:
            with dbh.cursor() as cur:
                cur.execute('delete from web_companies where id = "'+str(id)+'"')
                out_data = {
                    'status': 'ok'
                }
        except:
            out_data={
                'status': 'error'
            }
    return jsonify(out_data)


@app.route('/save_company', methods=['POST'])
def save_company():
    id=int(request.form.get('id'))
    name=request.form.get('name')
    phone=request.form.get('phone')
    s_name=request.form.get('s_name')
    print('id:', id, 'name: ', name, 'phone: ', phone, 's_name: ', s_name)
    if id>0:
        sql = f"UPDATE web_companies set name='{name}', phone='{phone}', web_sfear_id='{s_name}' WHERE id='{id}'"
    else: 
        sql = f"INSERT INTO `web_companies` (`name`, `phone`, `web_sfear_id`) VALUES ('{name}', '{phone}', '{s_name}');"
    # try:
    with dbh.cursor() as cur:
        cur.execute(sql)
        out_data={
            'status': 'ok',
        }
    # except:
    #     out_data={
    #             'status': 'error',
    #         }
    return jsonify(out_data)


app.run(debug = True, host='db-learning.ithub.ru', port=1112)