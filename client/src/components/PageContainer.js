import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home"
import MyReviews from "./MyReviews";
import Signup from "./SignUp";
import MyProfile from "./Profile"
import Login from "./Login";
import UpcomingReleases from "./UpcomingReleases"
import SneakerTips from "./SneakerTips"

function PageContainer (){


   return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={Home}  />
                    <Route path="/myreviews" component={MyReviews}/>
                    <Route path="/upcomingreleases" component={UpcomingReleases} />
                    <Route path="/sneakertips" component={SneakerTips} />
                    {/* <Route path="/my-profile" component={MyProfile} /> */}
                    {/* <Route path="/signup" component={Signup} /> */}
                    {/* <Route path="/login" component={Login} /> */}
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default PageContainer