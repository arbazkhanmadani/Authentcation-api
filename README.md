/*
    API DOCUMANTATION
    NAME - ARBAZ KHAN
*/

Requirements:

1.User Signup:
    Create an endpoint (/api/signup) that allows users to register with the following details:
    username, password, and email.
    Validate user input, hash the password, and store the user details securely in a MongoDB
    database.

2. User Login:
     Implement an endpoint (/api/login) that allows users to log in with their email and password.
     Validate user credenƟals, generate a JWT (JSON Web Token) for authenƟcaƟon, and send it
    back to the client.

3. User Profile:
     Create an endpoint (/api/profile) that retrieves and displays the user's profile informaƟon
    based on the provided JWT.



Task 2: Send Confirmation Email link Signup

Overview:
     Extend the signup funcƟonality to send a confirmaƟon email to the user aŌer successfully
    registering.


Requirements:

1.Email Sending:
     Integrate an email sending service (e.g., Node mailer) to send confirmaƟon emails.
     Include a confirmaƟon link or code in the email.


 Technology and IDE's used - 
 1. Nodejs
 2. ExpressJs
 3. MongoDB
 4. MongoDB Compass
 5. VSCode
 6. Postman

 
 Libraries Used - 
1. express
2. cookie-parser
3. body-parser
4. jsonwebtoken
5. nodemailer
6. mongoose
7. crypto
8. json
9. path
10. fs
11. handlebars
