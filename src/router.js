import React, { Component } from 'react';
import {Route,Switch} from "react-router-dom";
import Home from './component/home/home';
import ThuePhongTro from './component/thuephongtro/thuephongtro';
import ThueNhaTro from './component/thuenhatro/thuenhatro';
import Contact from './component/contact/contact';
import NewsDetail from './component/newsdetail/newsdetail'
import ThueCanHo from './component/thuecanho/thuecanho';

function RouterWeb (props) {
    console.log('props.StateNextPage', props.StateNextPage)
        return (
            <div>
                    <Switch>
                        {!props.StateNextPage &&
                            <Route
                                exact path='/'
                                render={props => < Home {...props} NewsDetailtoApp={props.NewsDetailtoApp}     // State img-home silderShow (True or False)
                                StateFiterTyhomeNewstoApp={props.StateFiterTyhomeNewstoApp}
                                NewsFiltertoApp={props.NewsFiltertoApp}             // List then News Filter
                                clickFindNewstoApp={props.clickFindNewstoApp}       // State press button Find News to Filter (True or False)
                                GetNameCityFiltertoApp={props.GetNameCityFiltertoApp}
                                GetNameDistrictsFiltertoApp={props.GetNameDistrictsFiltertoApp}
                                />}



                            />
                        }
                        <Route
                            path="/thue-phong-tro"
                            render={props => < ThuePhongTro {...props} NewsDetailtoApp={props.NewsDetailtoApp}
                            StateFiterTyhomeNews_FtoApp={props.StateFiterTyhomeNews_FtoApp}
                            NewsFiltertoApp={props.NewsFiltertoApp}
                            clickFindNewstoApp={props.clickFindNewstoApp}
                            ListNewsResettoApp={props.ListNewsResettoApp}
                            GetNameCityFiltertoApp={props.GetNameCityFiltertoApp}
                            GetNameDistrictsFiltertoApp={props.GetNameDistrictsFiltertoApp}/>}
                        />
                        {/* {props.stateFiterandslide_imgApp && */}
                        <Route
                            path="/trang-chu/thong-tin-chi-tiet/:id"
                            render={props => < NewsDetail {...props} NewsDetailtoApp={props.NewsDetailtoApp}
                            />}
                        />
                        {/* } */}
                         <Route
                           path="/thue-nha-tro"
                            render={props => < ThueNhaTro {...props} NewsDetailtoApp={props.NewsDetailtoApp}
                            StateFiterTyhomeNews_FtoApp={props.StateFiterTyhomeNews_FtoApp}
                            NewsFiltertoApp={props.NewsFiltertoApp}
                            clickFindNewstoApp={props.clickFindNewstoApp}
                            ListNewsResettoApp={props.ListNewsResettoApp}
                            GetNameCityFiltertoApp={props.GetNameCityFiltertoApp}
                            GetNameDistrictsFiltertoApp={props.GetNameDistrictsFiltertoApp}/>}
                        />
                         <Route
                           path="/thue-can-ho"
                            render={props => < ThueCanHo {...props} NewsDetailtoApp={props.NewsDetailtoApp}
                            StateFiterTyhomeNews_FtoApp={props.StateFiterTyhomeNews_FtoApp}
                            NewsFiltertoApp={props.NewsFiltertoApp}
                            clickFindNewstoApp={props.clickFindNewstoApp}
                            ListNewsResettoApp={props.ListNewsResettoApp}
                            GetNameCityFiltertoApp={props.GetNameCityFiltertoApp}
                            GetNameDistrictsFiltertoApp={props.GetNameDistrictsFiltertoApp}/>}
                        />
                        <Route path="/lien-he" component={Contact}/>

                    </Switch>
            </div>
        );
    }

export default  RouterWeb;