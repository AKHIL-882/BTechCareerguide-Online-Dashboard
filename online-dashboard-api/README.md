# BTechCareerguide-Online-Dashboard

# Database Setup

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=online_dashboard_api
DB_USERNAME=root
DB_PASSWORD=

# For Mail Setup

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=Venkateshkalamata93@gmail.com
MAIL_PASSWORD=yntcclgemoiliely
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="venkateshkalamata93@gmail.com"
MAIL_FROM_NAME="${APP_NAME}"

# Password Grant Setup

Setup Password Grant intial client by following these steps

Run the following commands

php artisan install:api --passport (choose 0[users] and setup a name)
run the migrations if it is not done
php artisan passport:client --password

set the client Id and secret in env clear
ex :-
PASSWORD_GRANT_CLIENT_ID = 9dbecb30-e534-417f-b28a-911b92e94e86
PASSWORD_GRANT_CLIENT_SECRET = TlFSGDhqOLQV67AWyHeaqfFP5EhfNALuXMWVev8r

# Spatie roles and permissions setup

Setup Spatie roles and permissions by following these steps

Run the following commands

composer require spatie/laravel-permission

php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"

php artisan migrate

make sure to hit the "create-user-admin-role" route to create roles

# Database seed for job Opportunity

run the following command
php artisan db:seed --class=JobOpportunitySeeder

# API'S

Authenticated Routes (Requires API Token)

1. Logout
   Endpoint: api/logout
   Methods: POST, GET
   Description: Logs the user out and invalidates their session/token.
   Middleware:
   auth:api
   api

2. Refresh Access Token
   Endpoint: api/refresh-token
   Methods: POST
   Description: Refreshes the user's access token.
   Middleware:
   auth:api
   api

3. jobs
   Endpoint: api/jobs
   Method: GET
   Description: Returns all job opportunities
   Middleware:
   auth:api
   api

4. create
   Endpoint: api/jobs/create
   Method: POST
   Description: to create a new job opportunity
   Middleware:
   auth:api
   api

5. update
   Endpoint: api/jobs/{id}/update
   Method: POST
   Description: to update a job opportunity
   Middleware:
   auth:api
   api

6. delete
   Endpoint: api/jobs/{id}/delete
   Method: DELETE
   Description: to delete a job opportunity
   Middleware:
   auth:api
   api

7. show
   Endpoint: api/jobs/{id}/show
   Method: GET
   Description: to show a job opportunity
   Middleware:
   auth:api
   api

8. projects
   Endpoint: api/projects
   Method: GET
   Description: Returns all projects
   Middleware:
   auth:api
   api

9. create
   Endpoint: api/projects/create
   Method: POST
   Description: to create a new project
   Middleware:
   auth:api
   api

10. update
    Endpoint: api/projects/{id}/update
    Method: POST
    Description: to update a project
    Middleware:
    auth:api
    api

11. delete
    Endpoint: api/projects/{id}/delete
    Method: DELETE
    Description: to delete a project
    Middleware:
    auth:api
    api

12. show
    Endpoint: api/projects/{id}/show
    Method: GET
    Description: to show a project
    Middleware:
    auth:api
    api

Guest Routes (For Unauthenticated Users)

1. Reset Password
   Endpoint: api/reset-password
   Methods: POST
   Description: Sends a reset link to the user's email.
   Middleware:
   guest
   throttle:10,1

2. Update Password
   Endpoint: api/update-password
   Methods: POST
   Description: Updates the user's password after verifying the reset token.
   Middleware:
   guest
   throttle:10,1

3. Sign Up
   Endpoint: api/signup
   Methods: POST
   Description: Registers a new user and generates both access and refresh tokens.
   Middleware:
   guest
   throttle:10,1

4. Login
   Endpoint: api/login
   Methods: POST
   Description: Authenticates the user and returns an access token and refresh token.
   Middleware:
   guest
   throttle:10,1

5. create user admin role
   Endpoint: api/create-user-admin-role
   Methods: GET
   Description: Authenticates the user and returns an access token and refresh token.
   Middleware:
   guest
   throttle:10,1

# Middleware Explanation

auth:api: Ensures the user is authenticated via API token.
guest: Ensures the user is not authenticated before accessing routes like login, signup, or password reset.
throttle:10,1: Limits requests to 10 per minute to prevent abuse.
api: Handles API-specific features, such as rate-limiting.
