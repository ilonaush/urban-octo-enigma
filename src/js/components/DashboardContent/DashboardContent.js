import React from 'react';
import "./DashboardContent.styl";
import {Route} from "react-router-dom";
import Loader from "../Loader/Loader";
import DynamicImport from "../../tools/DynamicImport";

const List = DynamicImport({
  resolve: () => import('../List/List'),
  loader: Loader
});
const History = DynamicImport({
  resolve: () => import('../History/History'),
  loader: Loader
});
const AddCatWrapper = DynamicImport({
  resolve: () => import('../AddCatWrapper/AddCatWrapper'),
  loader: Loader
});
const FindHomeWrapper = DynamicImport({
  resolve: () => import('../FindHomeWrapper/FindHomeWrapper'),
  loader: Loader
});
const CatPage = DynamicImport({
  resolve: () => import('../CatPage/CatPage'),
  loader: Loader
});
const Gallery = DynamicImport({
  resolve: () => import('../Gallery/Gallery'),
  loader: Loader
});
const Page500 = DynamicImport({
  resolve: () => import('../Page500/Page500'),
  loader: Loader
});

console.log(History);


const DashboardContent = () => {
  return (
      <div className='d-content'>
        <Route exact path='/'
               component={List}
        />
        <Route exact path='/history'
               component={History}
        />
        <Route exact path='/add-cat'
               component={AddCatWrapper}
        />
        <Route exact path='/find-home'
               component={FindHomeWrapper}
        />
        <Route exact path='/cat/:id'
               component={CatPage}
        />
        <Route exact path='/gallery'
               component={Gallery}
        />
        <Route exact path='/500'
               component={Page500}
        />
      </div>
  );
};

export default DashboardContent;
