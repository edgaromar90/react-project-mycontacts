from flask import Flask, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import platform

app = Flask(__name__)
CORS(app)

if platform.system() == 'Windows':
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.getcwd()+'\\database.db'
else:
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getcwd()+'/database.db'

#Removing the notification in the command line when running the app
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#Basic Model for Contact
class Contact(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(30))
  occupation = db.Column(db.String(20))
  skills = db.relationship('Skill', backref='contact', lazy='dynamic', cascade='all, delete, delete-orphan')

  def __repr__(self):
    return "<Contact(name='%s', occupation='%s')>" % (self.name, self.occupation)

#Basic Model for Skill
class Skill(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  skill_name = db.Column(db.String(20))
  contact_id = db.Column(db.Integer, db.ForeignKey('contact.id'))

  def __repr__(self):
    return "<Skill(skill_name='%s')>" % (self.skill_name)

#################### UTILS ################

def formatContact(contact, skills):
  '''
  Receives a contact and the skills and create a new formatted
  dictionary.
  @param -> {contact} - dictionary
  @param -> [skills] - list of skills for this contact
  @return -> {contact} - dictionary with the right format
  '''
  return {
    'id':contact.id,
    'name':contact.name,
    'occupation':contact.occupation,
    'skills': skills
  }

def fetchSkills(contact):
  '''
  Fetch the skills associated with the contact, and return
  the list of skills found, if there's no skills then an
  empty list is returned.
  @param -> {contact} - dictionary of contact
  @return -> [skill_list] - list of skills (if found)
  '''
  skill_list = []
  try:
    skills = Skill.query.filter_by(contact=contact)
    for skill in skills:
      skill_list.append(skill.skill_name)
  except:
    return []
  else:
    return skill_list

def fetchContacts():
  '''
  Fetch the contacts from the database, it uses "fetchSkills" to gather
  the skills of those contacts and using "formatContact" to format each
  contact.
  @return -> [response] - list of dictionaries [{},{}...]
  '''
  response = []
  try:
    contacts = Contact.query.all()
  except:
    return 'Error db'

  if len(contacts) == 0:
    return 'Not found'
  for contact in contacts:
    contact_skills = fetchSkills(contact)
    response.append(formatContact(contact, contact_skills))
  return response

############### END OF UTILS #####################

@app.route('/get/contact/', methods=['GET'])
def getAllContacts():
  contacts = fetchContacts()

  if contacts == 'Error db':
    return jsonify({'error':'Error with the database'})

  elif contacts == 'Not found':
    return jsonify({'error':'No Contacts in the database'})

  else:
    return jsonify(contacts)

@app.route('/get/contact/<id>', methods=['GET'])
def getContact(id):
  #Fetching the contact with the matching ID
  try:
    contact = Contact.query.filter_by(id=id).first()
  except:
    return jsonify({'error':'Error with the Database'})

  if not contact:
    return jsonify({'error':'Contact does not Exist'})

  #Fetching Skills of the current contact
  skills = fetchSkills(contact)

  return jsonify(formatContact(contact, skills))

@app.route('/create/contact/', methods=['POST'])
def createContact():
  contact = request.get_json()
  skills = []
  for skill in contact['skills']:
    try:
      skills.append(Skill(skill_name=skill))
    except:
      return jsonify({'response':'Error with the database'})
  try:
    new_contact = Contact(name=contact['name'], occupation=contact['occupation'], skills=skills)
    db.session.add(new_contact)
    db.session.commit()
    db.session.close()
  except:
    return jsonify({'response':'Error commiting to the database'})
  return jsonify({'response':'success', 'info':'User created'})


@app.route('/delete/contact/<id>', methods=['DELETE', 'OPTIONS'])
def deleteContact(id):
  if request.method == 'OPTIONS':
    return jsonify({'response':'option arrived'})
  contact = db.session.query(Contact).get(id)
  if contact == None:
    return "contact does not exist"
  else:
    try:
      db.session.delete(contact)
      db.session.commit()
      db.session.close()
    except:
      return jsonify({'response':'failed', 'info':'Error with the database'})
    return '' #Automatically gets transformed to a '200 Ok' response

if __name__ == '__main__':
  app.run()
