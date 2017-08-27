from flask import Flask

app = Flask(__name__)

@app.route('/get/contacts', methods=['GET'])
def getContacts():
  return '<h1>We are here</h1>'

if __name__ == '__main__':
  app.run()