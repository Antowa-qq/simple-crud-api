# How to start
1. Clone my [repository](https://github.com/Antowa-qq/simple-crud-api) on your pc 
2. Go to the folder with the repository 
3. Go to the branch ```api-in-memory```
4. Install dependencies with ``` npm i ```
5. Run the project in development mode using the ``` npm run start:dev``` command, run the project in testing mode using the ``` npm run test``` command 

# How to use
Basic route of attachment for this app localhost:5000. For get, put, delete methods you need to use id format uuid.

  API path `/person`:
   * **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
   * **POST** `/person` is used to create record about new person and store it in database
   * **PUT** `/person/${personId}` is used to update record about existing person
   * **DELETE** `/person/${personId}` is used to delete record about existing person from database
 
