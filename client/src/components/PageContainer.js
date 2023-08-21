import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home"
import MyReviews from "./MyReviews";
import Favorites from "./Favorites";

function PageContainer (){


   return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={Home}  />
                    <Route path="/myreviews" component={MyReviews}/>
                    <Route path="/favorites" component={Favorites} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default PageContainer