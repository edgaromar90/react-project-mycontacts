from setuptools import setup

setup(
    name='server',
    author='Enter your name',
    author_email='enteryour@email.com',
    description=('My Description'),
    packages=['server'],
    include_package_data=True,
    install_requires=[
        'flask',
        'flask_sqlalchemy',
        'flask_cors',
        'virtualenv'
    ],
)
#SET FLASK_APP="server" windows
#SET FLASK_DEBUG="1"
#$env:FLASK_APP="server" if using powershell
#$env:FLASK_DEBUG="1"
#export FLASK_APP=server in Linux
#pip install -e .
#flask run