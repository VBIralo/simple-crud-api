# Task 3. Simple CRUD API

## Installation & Setup
```bash
git clone https://github.com/VBiralo/simple-crud-api
cd simple-crud-api
npm install
```

Then you need to specify the port in the `.env` file.
The `.env` file should be like this (for example):
```bash
PORT=3000
```

And finally you can start the server with the following command.
```bash
npm run start:dev
```

## Commands
- `npm run start:prod` - The server starts in `production` mode. The project bundle is first assembled in it and then it is launched.
- `npm run start:dev` - The server starts in `development` mode. In it, the server is started using nodemon.
- `npm run test` - Runs test scripts.

## How to work with it?
1. Start the server in either of two modes (`$npm run start:prod` or `$npm run start:dev`). We will deploy the server at `localhost:3000` (the port is configured in the `.env` file)
2. Requests should be sent using the following API path `/person` (e.g. `localhost:3000/person/`):
  * **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
  * **POST** `/person` is used to create record about new person and store it in database
    > the body of the POST request must have the following format:
    ```JSON
    {
    "name": string, 
    "age": number, 
    "hobbies": array of strings or empty array
    }
    ```
  * **PUT** `/person/${personId}` is used to update record about existing person
    > the body of the PUT request must have at least one of the following parameters: `"name"`,`"age"`,`"hobbies"`. In addition, the `"hobbies"` field should be array of strings or empty array.

  * **DELETE** `/person/${personId}` is used to delete record about existing person from database