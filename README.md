# Getting Started with fullstack-react-flask-mock-project

## Install node modules

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start:all`

It runs these commands in concurrent mode 
`"npm:flask-run"  "npm:start"`

full command in package.json 
```
  "scripts": {
    "start:all": "concurrently  \"npm:flask-run\" \"npm:start",
    "flask-run": "cd api && python -m venv venv && cd venv/Scripts && activate && cd ../../ && pip install -r requirements.txt && flask setup && flask loadcsv && flask run"
    "start": "react-scripts start",
  }
```

`npm:flask-run`

This command will initialize virtualenv in `api` folder which is at root directory and activate venv environment
after activating it will execute command to install all required packages from requirement.txt file which is in api folder

after successfully installing packages 
`flask setup && flask loadcsv` commands will be executed, 
these command will drop previous tables if available and create new tables from schema, and load data from csv which are available in api/static directory 

after successfully loading everything `flask run` will be executed to run flask server at 5000 port

`npm:start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Make sure 3000 port is available


