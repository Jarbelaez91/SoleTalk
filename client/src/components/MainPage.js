import React from "react";
import Home from "./Home"
import UpcomingReleases from "./UpcomingReleases"
import SneakerTips from "./SneakerTips"
import NavBar from "./NavBar"
import { BrowserRouter, Route, Switch} from "react-router-dom";
import MyReviews from "./MyReviews";
import AddReview from "./AddReview"

function MainPage({ onLogout, user }) {
    console.log("User in MainPage:", user)
    return (
        <div>
            <BrowserRouter>
                <NavBar onLogout={onLogout} />
                <Switch>
                    <Route exact path='/' component={Home}  />
                    <Route path="/myreviews" component={MyReviews}/>
                    <Route path="/upcomingreleases" component={UpcomingReleases} />
                    <Route path="/sneakertips" component={SneakerTips} />
                    <Route path="/add-review">
                        <AddReview user={user} />
                    </Route>
                    <Route path="/my-reviews"> <MyReviews user={user} />
                    </Route>
                    {/* <Route path="/signup" component={Signup} /> */}
                    {/* <Route path="/login" component={Login} /> */}
                </Switch>
            </BrowserRouter>
        </div>
    )
}


export default MainPage;


