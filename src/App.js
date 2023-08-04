
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from './page/Home';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Detail from './page/Detail';
import UserManagement from './page/UserManagement';
import ProductMangement from './page/ProductMangement';
import AddUser from './page/AddUser';
import EditUser from './page/EditUser';
import AddProduct from './component/AddProduct';
import EditProduct from './component/EditProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/sign-up' element={<SignUp/>} />
          <Route exact path='/detail' element={<Detail/>} />
          <Route exact path='/admin/user-management' element={<UserManagement/>} />
          <Route exact path='/user/product-management' element={<ProductMangement/>} />
          <Route exact path='/admin/add-user' element={<AddUser/>} />
          <Route exact path='/admin/edit-user/:id' element={<EditUser/>} />
          <Route exact path='/sell/add-product' element={<AddProduct/>} />
          <Route exact path='/sell/edit-product/:id' element={<EditProduct/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
