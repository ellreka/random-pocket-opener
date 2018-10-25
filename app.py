import os
import requests
import random
import json
import webbrowser
from flask import Flask,render_template,request,redirect,url_for

app = Flask(__name__)

print(os.environ)

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
    open_number = request.form['num']
    print(request.form['num'])
    f = open('bookmark.json','r')
    l = json.load(f)
    print(f)
    print([a[0][0] for a in list(l['list'].items())])
    # values = random.sample([a for a in list(l['list'].items()) if a[0] == 'どーが'],int(open_number))

    # print(values)
    # for k in values:
    #   print(k[1]['resolved_url'])
    #   print(k[1]['tags'])
    #   webbrowser.open(k[1]['resolved_url'],new=2)
    # url = values[1]['resolved_url']
    # url = values.items()['resolved_url']
    # print(url)
    # webbrowser.open(url,new=2)
    return redirect(url_for('index'))
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



