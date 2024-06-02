# PartyManagmentSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Party Management System

. Table of Contents
. Features
. Technologies Used
. Getting Started
. Prerequisites
. Installation
. Running the Application
. Project Structure
. Usage

Features
. Create new records
. Read and display existing records
. Update existing records
. Delete records
. User-friendly UI built with Angular Material

Technologies Used
. Angular
. Angular Material
. TypeScript
. RxJS
. HTML5
. Bootstrap 5
. CSS3

Getting Started
Prerequisites
Before you begin, ensure you have the following installed:

. Node.js (v16 or higher)
. Angular CLI (v16 or higher)


Installation:
Clone the repository:
git clone https://github.com/ShubhamSofttrade/party_managment_system.git
cd angular-crud-app

Install dependencies:
npm install

Running the Application
1. Start the development server:
   ng serve
2 Open your browser and navigate to http://localhost:4200.


Project Structure
angular-crud-app/
├── src/
│   ├── app/
│   │   ├── PartyModule/Party
│   │   │   ├── partyComponent/
│   │   │   ├── partyAllDataComponent/
│   │   │   ├── partyFormComponet/
│   │   ├── AuthModule/
│   │   │   ├── AuthComponent/
│   │   │   ├── LoginComponent/
│   │   ├── DataClass/
│   │   │   ├── partyDataClass/
│   │   ├── services/
│   │   │   ├── loginService/
│   │   │   ├── alertsService/
│   │   │   ├── toasterService/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── .gitignore
├── angular.json
├── package.json
├── README.md
└── tsconfig.json

Usage

Creating a Record
1.Navigate to the "Create" page by click on + icon.
2.Fill in the form with the necessary details.
3.Click the "Submit" button to create a new record.

Reading Records
1.View the list of all records available.

Updating a Record
1.Click the "Edit" button next to the record you want to update.
2.Navigate to the "Form" page.
3.Modify the details in the form.
4.Click the "Save" button to update the record.

Deleting a Record
1.Click the "Delete" button next to the record you want to delete.
2.Confirm the deletion in the popup dialog.

API Endpoints
For the backend API, the following endpoints are assumed:

GET /api/records: Retrieve all records
GET /api/records/:id: Retrieve a single record by ID
POST /api/records: Create a new record
PUT /api/records/:id: Update a record by ID

