# Getting Started with fullstack-react-flask-mock-project

## Install node modules

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start:all`

It runs these commands in concurrent mode 
`"npm:flask-run"  "npm:start"`

full command in package.json 
`"start:all": "concurrently  \"npm:flask-run\" \"npm:start",`

`npm:flask-run`

This command will initialize virtualenv in `api` folder which is on root and then activate this env
after activating it will install all required packages from requirement.txt file which is in api folder

after successfully installing packages 
`flask setup && flask loadcsv` commands will run, 
these command will drop previous tables if available and create new tables from schema, and load data from csv which are available in api/static directory 

after successfully loading everything `flask run` will be executed to run flask server at 5000 port

`npm:start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Make sure 3000 port is available


