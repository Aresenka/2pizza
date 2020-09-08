## Yay!

This is my first laravel+react-based app!
It is fake pizzeria app, where you can order some meals and manage orders as admin. It would be more feauters after couple of moths ;)

This is libraries I've used:

- react-router-dom (for routing in admin space)
- reactstrap (for bootstrap modals, popovers and buttons)
- prop-types (as library of react property types)
- react-table (for admin space tables)
- tymon/jwt-auth (for authorization and token authentification)

This is TODO list:

- [x] **Add admin space**
- [x] **Add login feature**
- [x] **Make app fully adaptive**
- [x] **Make code more readable and write comments**
- [x] **Refactor styles SASS way**
- [x] **Protect API from outdoor use**

- [ ] *Separate project to backend and frontend*
- [ ] *Add meals, deals, settings, intro items CRUD to admin space*
- [ ] *Add user profile: default phone number, name and address*
- [ ] *Add order list for authorized users*
- [ ] *Add all texts to site settings and make it editable in admin space*
- [ ] *Add tests for both react and laravel code*
- [ ] *Refactor app using new experience!*

This is deploy steps:

1. Clone this repo
1. Add .env file with your environment settings
1. Create database and grant privileges to user you will use to that database
1. Add database settings to .env file
1. Run *composer install*
1. Run *npm install* to install dependencies
1. Run *php artisan migrate --seed* to create tables and fill them with default data
1. Finally, run *npm run prod*

[This is app itself](pizza.scilef.com) (use admin@2pizza.com - delicious! credentials to auth)
