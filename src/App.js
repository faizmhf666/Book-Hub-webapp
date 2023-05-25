import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/shelf" component={Bookshelves} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
/*   import Bookshelves from './components/Bookshelves'    */
