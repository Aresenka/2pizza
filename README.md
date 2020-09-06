## Yay!

This is my first version of my first laravel+react-based app!
It is plenty things to do, but it is ready to be commited, so... I'm glad to introduce you the fake pizzeria site!

This is libraries I've used:

- react-router-dom (for routing in admin space)
- reactstrap (for bootstrap modals, popovers and buttons)
- prop-types (as library of react property types)
- react-table (for admin space tables)

This is TODO list:

- [ ] **Add admin space: orders list, meals CRUD, site settings**
- [ ] **Add login feature**
- [x] **Make app fully adaptive**
- [ ] **Make code more readable and write comments**
- [x] **Refactor styles SASS way**
- [ ] **Protect API from outdoor use**

- [ ] *Separate project to backend and frontend*
- [ ] *Add user profile: default phone number, name and address*
- [ ] *Add order list for authorized users*
- [ ] *Add deals CRUD*
- [ ] *Add intro items CRUD*
- [ ] *Add all texts to site settings and make it editable in admin space*
- [ ] *Add tests for both react and laravel code*

This is deploy steps:

1. Clone this repo
1. Add .env file with your environment settings
1. Create database and grant privileges to user you will use to that database
1. Add database settings to .env file
1. Run *composer install*
1. Run *npm install* to install dependencies
1. Run *php artisan migrate --seed* to create tables and fill them with default data
1. Finally, run *npm run prod*
