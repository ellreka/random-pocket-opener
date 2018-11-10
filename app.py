import os
from os.path import join, dirname
from dotenv import load_dotenv
import requests
import random
import json
from pocket import Pocket
from flask import Flask,render_template,request,redirect,url_for,jsonify,session,make_response

app = Flask(__name__)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app.secret_key = 'randompocketopener'
consumer_key = os.environ['CONSUMER_KEY']
# redirect_uri = 'http://localhost:5000/callback'
redirect_uri = 'https://random-pocket-opener.herokuapp.com/callback'

@app.route('/',methods=['GET','POST'])
def index():
  access_token = request.cookies.get('access_token')
  print(access_token)
  if not access_token == None:
    print(access_token)
    return render_template('index.html')
  else:
    print(access_token)
    return render_template('login.html')

@app.route('/login',methods=['GET','POST'])
def login():
  if request.method == 'POST':
    request_token = Pocket.get_request_token(consumer_key=consumer_key, redirect_uri=redirect_uri)
    print(request_token)
    session['request_token'] = request_token
    auth_url = Pocket.get_auth_url(code=request_token, redirect_uri=redirect_uri)
    print(auth_url)
    return redirect(auth_url)
  else:
    return redirect(url_for('index'))

@app.route('/logout',methods=['GET','POST'])
def logout():
  return redirect(url_for('index'))


@app.route('/callback', methods=['GET','POST'])
def callback():
  request_token = session.get('request_token')

  user_credentials = Pocket.get_credentials(consumer_key=consumer_key, code=request_token)

  access_token = user_credentials['access_token']

  resp = make_response(redirect(url_for('index')))
  resp.set_cookie('access_token', access_token)
  return resp
  return redirect(url_for('index'))

@app.route('/open', methods=['GET','POST'])
def pick():
  if request.method == 'POST':
    print(request.json)
    if len(request.json["article"]) > int(request.json["num"]):
      ramdom_list = random.sample(request.json["article"], int(request.json["num"]))
      return jsonify(ramdom_list)
      return redirect(url_for('index'))
    else:
      ramdom_list = random.sample(request.json["article"], len(request.json["article"]))
      return jsonify(ramdom_list)
      return redirect(url_for('index'))
  else:
    return redirect(url_for('index'))


@app.route('/update', methods=['GET','POST'])
def update():
  access_token = request.cookies.get('access_token')
  print(access_token)
  payload = {'consumer_key': consumer_key,'access_token': access_token ,'state':'all','contentType':'article','sort':'newest','detailType':'complete'}
  r=requests.post('https://getpocket.com/v3/get',data=payload)
  all_pocket = r.json()
  # simple_pocket_list = []
  page_data_list = []
  tags_list = []
  for a in all_pocket['list'].items():
    l = {
      "title":a[1]['resolved_title'],
      "url":a[1]['resolved_url'],
      "tag":list(a[1].setdefault('tags',''))
      }
    page_data_list.append(l)
    for t in list(a[1].setdefault('tags','')):
      tags_list.append(t)
  tags_list = list(set(tags_list))
  # simple_pocket_list.append(tags_list)
  # simple_pocket_list.append(page_data_list)
  return jsonify(page_data_list,tags_list)
  return redirect(url_for('index'))


if __name__ == '__main__':
    app.debug = True
    app.run()





