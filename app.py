import os
import requests
import random
import json
import webbrowser
from flask import Flask,render_template,request,redirect,url_for,jsonify

app = Flask(__name__)

print(os.environ)
os.environ['POCKET_CONSUMER_KEY'] = '81334-d57a6937c20cab86963d47e2'
os.environ['POCKET_ACCESS_TOKEN'] = '96177e8c-2c1b-7884-0f2e-a2b69c'
consumer_key = os.environ['POCKET_CONSUMER_KEY']
access_token = os.environ['POCKET_ACCESS_TOKEN']


@app.route('/',methods=['GET','POST'])
def index():
  print(request) 
  if request.method == 'POST':
    print('ポスト')
    return render_template('index.html')
  else:
    return render_template('index.html')

@app.route('/test', methods=['GET','POST'])
def test():
  print(request.method)
  if request.method == 'POST':

    # payload = {'consumer_key': consumer_key,'access_token': access_token , 'state':'all','sort':'newest','detailType':'complete'}
    # r=requests.post('https://getpocket.com/v3/get',data=payload)
    # l = r.json()
    # values = random.sample([a[1] for a in list(l['list'].items())],int(3))
    f = open('assets/bookmark.json','r')
    l = json.load(f)
    # すべてとそれ以外で場合分け
    if request.json['tag'] == '全て':
      print('aaaaa')
      values = random.sample([a[1] for a in list(l['list'].items())],int(request.json['number']))
      return jsonify(values)
    else:
      arr = []
      print('eeeeee')
      for k in l['list'].items():
        if request.json['tag'] in k[1]['tags']:
          if k[1]['tags'][request.json['tag']]['tag'] == request.json['tag']:
            print(k[1]['tags'])
            arr.append(k[1])        
          else:
            print('aeuhetase')
    values = random.sample(arr,int(request.json['number']))
    return jsonify(values)
  else:
    return redirect(url_for('index'))

@app.route('/refresh', methods=['POST'])
def refresh():
  payload = {'consumer_key': consumer_key,'access_token': access_token , 'state':'all','sort':'newest','detailType':'complete'}
  r=requests.post('https://getpocket.com/v3/get',data=payload)
  responce_data = r.json()
  f = open('bookmark.json','w')
  json.dump(responce_data, f, ensure_ascii=False, indent=4, separators=(',', ': '))
  print('リフレッシュ')
  return redirect(url_for('index'))

if __name__ == '__main__':
    app.debug = True
    app.run()

# payload = {'consumer_key':'81334-d57a6937c20cab86963d47e2','redirect_uri': 'http://localhost:80'}
# r=requests.post('https://getpocket.com/v3/oauth/request', data=payload)
# print(r.content)

# payload = {'consumer_key':'81334-d57a6937c20cab86963d47e2','code': 'cfa39287-8f83-45fb-262a-0c4748'}#codeはrequest_token
# r=requests.post('https://getpocket.com/v3/oauth/authorize', data=payload)
# print(r.content)



