# shopping_cart_api_asp_dotnet_core_express

This Project  is a simple RESTful API built using Node js express server.

Project contents:-
1) Models Folder Containing All models and mangoos Schema needed for creating database table(i.e. Carts,Comments,Orders,Products,Users).
2) Routes Folder containing all the routes of our application as well as Api End points and api logic for all tables.
3) main.js file which contains main  entry point of our app. It initializes the Express server, connects to MongoDB Database and sets PORT on which server runs.
4) package.json contains all dependencies required by this project.
5) postman_collection folder which contains postman suite to run all api's
6) README.md explaining how to run the code in local system.
7) gitignore file to ignore node modules form  commiting into repository.

To Run The Code In Local System Follow Below Steps:
Step 1: Install node.js from https://nodejs.org/en/.
Step 2: Extract this project zip the whereever you want.
Step 3: Open project in vs codes.
Step 4: Go to terminal and type "npm install" (It will automatically download all modules mentioned in package.json).
Step 5: Go to terminal and type "npm install express mongoose body-parser cors -y" (It will automatically take care of all dependencies)
Step 6: Go to terminal and type "npm install express-validator" for installing validator module. 
Step 7: Go to terminal and type "node main.js" and enter and you will see two messages "Server is running on port 3002" and
"Server connected to MongoDB"
Step 8: Now open postman and import postman suite cellection provided in postman_collection package , it will contain all requests needed to test api.
Step 9: Run all tests in postman.
Note : If there are any errors then please check your node version. This application works on v8 or above versions.

Mongo DB connection string:- 'mongodb+srv://mannambani007:hLFb623IKMlQXjRE@cluster0.tenux9l.mongodb.net/?retryWrites=true&w=majority'
My Github repo:- https://github.com/MannAmbani/shopping_cart_api_asp_dotnet_core_express.git
My Github:- https://github.com/MannAmbani

Thank you and enjoy coding.