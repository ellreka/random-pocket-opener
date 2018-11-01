import os
import requests
import random
import json
import webbrowser
import time
from pocket import Pocket
from datetime import datetime
from flask import Flask,render_template,request,redirect,url_for,jsonify,session,make_response

app = Flask(__name__)
app.secret_key = 'hogehoge'

consumer_key = '81334-d57a6937c20cab86963d47e2'
# redirect_uri = 'http://localhost:5000/callback'
redirect_uri = 'https://random-pocket-opener.herokuapp.com/callback'



@app.route('/',methods=['GET','POST'])
def index():
  access_token = request.cookies.get('access_token')
  if access_token:
    print(access_token)
    path = "bookmark.json"
    print(os.path.exists(path))
    if os.path.exists(path):
      with open("bookmark.json", 'r') as f:
        l = json.load(f)
        tags = l[0]
        return render_template('index.html',tags=tags)
    else:
      # with open("bookmark.json", 'w') as f:
      #   print(f)
      return render_template('index.html')
  else:
    return render_template('login.html')
  return render_template('login.html')
  return render_template('index.html')

  


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
  if request.method == 'POST':
    print('ログアウト')
    return redirect(url_for('index'))
  else:
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
    with open("bookmark.json", 'r') as f:
      l = json.load(f)
    all_list = []
    print(request.json)
    if request.json['tags'] == 'ALL':
      for a in l[1]:
        all_list.append(a)
      ramdom_list = random.sample(all_list, int(request.json['num']))
      # for u in ramdom_list:
      #   print(u['url'])
      #   webbrowser.open(u['url'])
      # print('ALL')
    elif request.json['tags'] == 'NoTag':
      print('NoTag')
    else:
      print(request.json['tags'])
      for a in l[1]:
        for b in a['tag']:
          if b == request.json['tags']:
            all_list.append(a)
      print(all_list)
      print(request.json['num'])
      ramdom_list = random.sample(all_list, int(request.json['num']))
      # for u in ramdom_list:
      #   print(u['url'])
      #   webbrowser.open(u['url'])
    return jsonify(ramdom_list)
    return redirect(url_for('index'))
  else:
    return redirect(url_for('index'))



    # access_token = request.cookies.get('access_token')
    # timestamp = request.cookies.get('timestamp')
    # payload = {'consumer_key': consumer_key,'access_token': access_token ,'contentType':'article','sort':'newest','detailType':'complete','count':'2','since':timestamp}
    # r=requests.post('https://getpocket.com/v3/get',data=payload)
    # new_pocket = r.json()
    # print(new_pocket)
    # with open("assets/bookmark.json", 'r') as f:
    #   l = json.load(f)
    #   l.append(new_pocket)
    #   with open("assets/bookmark.json", 'w') as f:
    #     json.dump(l, f, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
    # return jsonify("https://tweetdeck.twitter.com/")  




  # if request.method == 'POST':

  #   # payload = {'consumer_key': consumer_key,'access_token': access_token , 'state':'all','sort':'newest','detailType':'complete'}
  #   # r=requests.post('https://getpocket.com/v3/get',data=payload)
  #   # l = r.json()
  #   # values = random.sample([a[1] for a in list(l['list'].items())],int(3))
  #   f = open('assets/bookmark.json','r')
  #   l = json.load(f)
  #   # すべてとそれ以外で場合分け
  #   if request.json['tag'] == '全て':
  #     print('aaaaa')
  #     values = random.sample([a[1] for a in list(l['list'].items())],int(request.json['number']))
  #     return jsonify(values)
  #   else:
  #     arr = []
  #     print('eeeeee')
  #     for k in l['list'].items():
  #       if request.json['tag'] in k[1]['tags']:
  #         if k[1]['tags'][request.json['tag']]['tag'] == request.json['tag']:
  #           print(k[1]['tags'])
  #           arr.append(k[1])        
  #         else:
  #           print('aeuhetase')
  #   values = random.sample(arr,int(request.json['number']))
  #   return jsonify(values)
  # else:
  #   return redirect(url_for('index'))

@app.route('/refresh', methods=['POST'])
def refresh():
  access_token = request.cookies.get('access_token')
  print(access_token)
  payload = {'consumer_key': consumer_key,'access_token': access_token ,'state':'all','contentType':'article','sort':'newest','detailType':'complete'}
  r=requests.post('https://getpocket.com/v3/get',data=payload)


  all_pocket = r.json()
  print(all_pocket)

  simple_pocket_list = []
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
  simple_pocket_list.append(tags_list)
  simple_pocket_list.append(page_data_list)
  print(simple_pocket_list)

  with open("bookmark.json", 'w') as f:
    json.dump(simple_pocket_list, f, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
  return redirect(url_for('index'))


if __name__ == '__main__':
    app.debug = True
    app.run()





