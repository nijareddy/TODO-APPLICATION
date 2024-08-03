const express = require('express')
const app = express()
const cors = require('cors')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const bcrypt = require('bcrypt')
app.use(express.json())


app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin
}));


const { open } = require('sqlite')


const jwt = require('jsonwebtoken')


const dbpath = path.join(__dirname, 'todo.db')
let db

const initializingConnection = async () => {
  try {
    db = await open(
      {
        filename: dbpath,
        driver: sqlite3.Database
      }
    )
    app.listen(3005, () => {
      console.log('Server is running at http://localhost:3005');
    })

  }
  catch (e) {
    console.log(`The error message is ${e}`);
  }
}

initializingConnection()

app.post('/register',async (request,response)=>{
    const {username,password}=request.body
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist=`
     SELECT * FROM USERS WHERE username='${username}';
    `

    const queryRes=await db.get(userExist);


    if (queryRes===undefined){

        const createUser=`
          INSERT INTO users (username,password)
          VALUES('${username}','${hashedPassword}')
        `
        await db.run(createUser)

        response.send('User created')
    } 
    else{
        response.status(400)
        response.send('User already exists')
    } 
})


app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;   
 // Assuming table name is 'users'
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid User");
  } else {
    const isPasswordMatched = await bcrypt.compare(password,   
 dbUser.password);
    if (isPasswordMatched === true) {
      const payload = {
        

        userId: dbUser.id // Assuming 'id' is the user ID column
      };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      response.send({ jwtToken });
    } else {
      response.status(400);
      response.send("Invalid Password");   

    }
  }
});

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.user_id = payload.userId;
        next();
      }
    });
  }
};


app.post('/todos', authenticateToken,async (request, response) => {
  const { description, status } = request.body;
  const authorizedUser = request.user_id; // Assuming username is retrieved from middleware

  if (status === undefined) {
    response.status(400)
    response.send('Invalid Todo Status')
  } else if (description === undefined) {
    response.status(400)
    response.send('Invalid Todo Description')
  } else {

    const createQuery = `
      INSERT INTO TODO (USER_ID, DESCRIPTION,STATUS)
      VALUES(${authorizedUser},'${description}','${status}');
    `
    const resCreatedQuery = await db.run(createQuery)
    response.send('Todo Successfully Added')
  }
});







app.get('/todos', authenticateToken,async (request, response) => {
 const authorizedUser = request.user_id; 

 const getQuery = `SELECT * FROM TODO WHERE USER_ID LIKE ${authorizedUser};`
 const res=await db.all(getQuery)
 if (res === undefined){
  response.send([]) 
 }else{
  response.send(res)
 }

})

app.delete('/todos/:id',authenticateToken,async (request,response)=>{
  const {id}=request.params
  const authorizedUser = request.user_id; 

  const query=`
     DELETE FROM TODO WHERE id=${id} and user_id LIKE ${authorizedUser};
  `
  await db.run(query);
  response.send('deleted')
})

app.put('/todos/:id',authenticateToken,async (request,response)=>{
  const authorizedUser=request.user_id
  const {id}=request.params
  const {status}=request.body 

  const query=`
    UPDATE TODO SET status=${status} WHERE id=${id} and user_id LIKE ${authorizedUser};
  `
  await db.run(query)
  response.send('updated')
}) 































