/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/users', 'UsersController.create')

Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.delete('/users', 'UsersController.delete')
  Route.put('/users', 'UsersController.update')
}).middleware('auth')

Route.group(() => {
  Route.get('/solicitations', 'SolicitationsController.index')
  Route.put('/solicitations/:id', 'SolicitationsController.update')
  Route.delete('/solicitations/:id', 'SolicitationsController.delete')
}).middleware(['auth', 'admin'])

Route.post('/login', 'SessionsController.login')
Route.delete('/logout', 'SessionsController.logout')
