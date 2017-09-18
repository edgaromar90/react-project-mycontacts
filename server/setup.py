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
        'flask_cors'
    ],
)