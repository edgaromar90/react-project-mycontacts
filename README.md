# My Contacts App
This App will store contacts for you with name, occupation and skills of each contact, the image is temporarily hard coded but will add the feature later. This is a basic app built to demonstrate the fundamentals of _**React**_. It is worth mentioning that this app comes with a basic server written in _Python 2.7_ using _[Flask Micro-Framework](http://flask.pocoo.org/)_.

_**Note:**_ This App was created using facebook's tool [create-react-app](https://github.com/facebookincubator/create-react-app).

# Structure of the App
```
myContacts
+---public
+---server
\---src
    +---components
    |   +---App
    |   +---Contact
    |   +---CreateContact
    |   \---ListContacts
    \---utils
```
## Prerequisites
You'll need to install Node.js and npm first.
- [Node + npm](https://nodejs.org/en/). Node v6 or higher is required.
- _[Optional]_ [Python 2.7.13+](https://www.python.org/downloads/) this version ships with `pip`.

**Optional:** The app connects to an external API so you don't have to worry about running the server locally, but in case you want to run it locally then install `python` and `pip`.

## Installing
- Clone this Repo:
`git clone https://github.com/edgaromar90/react-project-mycontacts.git myContacts`
   - `myContacts` is optional (You can change the directory name).
- After cloning this repository, go inside the main directory `cd myContacts`.
- Once inside the main directory install all the dependencies with `npm install`.

After you have installed all the dependencies you just need to start the app `npm start`.

_The App should be running in_ **`localhost:3000`**

If you want more information on all the dependencies that will be needed for this App you can take a look at this file `package.json` located in the main directory.

_Note_: If you prefer to work with `yarn` just switch `npm` with `yarn` (`yarn start` instead of `npm start` for example).

## Backend Server
Before handling the files in the `/server` directory you should that the app is currently working with a very simple external API hosted by me. (This may change later so it's worth to take a look at this section if you ever have problem with the API).

I expect you to have `python 2.7.13+` and `pip` installed (as listed in the prerequisites), with that being said let see how we can make this work.

From the `/server` directory:

1. Install the virtual environment using pip `pip install virtualenv`.
2. Create a virtual environment `virtualenv venv`, we named ours `venv` but it's totally up to you (adjust the name for the following instructions if you decide to change it).
3. Once installed you'll want to **activate** that environment `./venv/Scripts/activate`. You'll know you have activated your environment successfuly because you'll see the name of the environment in your prompt like this `(venv) ~\Documents\myContacts\server`. (when you're done exit from the virtual environment with `deactivate` command.
4. Installing all the dependencies `pip install -e .` make sure to include the dot `.`.
When running this command you'll be asked to fill some fields like `author`, `description`... For the app to work correctly you should name the app "**server**" `name=server`. This will install the following dependencies:
    * [Flask Micro-Framework](http://flask.pocoo.org/)
    * [Flask SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.1/)
    * [Flask Cors](https://pypi.python.org/pypi/Flask-Cors)
5. Now it's time to create the database. We will be using `sqlite3` that comes with python. From the `/server` directory we will run the `python` command that will open up a python shell.
    From the Python Shell...
    * `from server import db` to import the sqlalchemy instance.
    * `db.create_all()` will create a file named `database.db` in the `/server` directory.
    * `exit()` to exit the Python shell into the main directory.
6. With all the **dependencies** installed and the **database** created all that's left is to setup some environment variables. _**Note**: I'll be using the syntax for PowerShell on Windows 10 to setup this variables, you should adjust depending on your Operating System_.
    * Setting up **FLASK_APP** with the name of the app `$env:FLASK_APP="server"`
    * [Optional] setup the **FLASK_DEBUG** variable. The Default is `0` or `False`, if you wish to run the server in development mode you can change it to `1` or `True`, `$env:FLASK_DEBUG="1"`.
7. And that's all we need to do, now run `flask run` command and the server should start on `port 5000`.