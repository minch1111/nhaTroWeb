import React, { Component, createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import './App.css';
import Header from './component/header/header';
import RouterWeb from './router';
import Newshome from './component/newshome/newshome';
import Footer from './component/footer/footer';
import ChangePassword from './component/newshome/change_password/change_password';
import PrivateRoute from './privateRoute/PrivateRoute';
import Home from './component/home/home';
import NewsDetail from './component/newsdetail/newsdetail';
import Thuenhatro from './component/thuenhatro/thuenhatro';
import ThueCanHo from './component/thuecanho/thuecanho';
import Contact from './component/contact/contact';
import ConfirmEmail from './component/confirmEmail/ConfirmEmail';
import authServices from './services/authServices';
import Messenger from './component/chatRoom/Messenger';
import { Socket, io } from 'socket.io-client';
import { apiWithoutUser } from './config/api';
let socket

// import { useLocation } from 'react-router-dom';
export const Context = createContext();

function App() {
  // const location = useLocation()
  const [nextpage, setNexPage] = useState(true);
  const [stateFiterandslide_img, setStateFiterandSlide_img] = useState(false);
  const [statefilter, setStatefilter] = useState(false);
  const [NewsFilter, setNewsFilter] = useState([]);
  const [NameCityFilter, setNameCityFilter] = useState([]);
  const [NameDistrictsFilter, setNameDistrictsFilter] = useState([]);
  const [clickFindNews, setClickFindNews] = useState(false);
  const [typenews_menu, setTypeNews_Menu] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('InfoUser')))
  const [userName, setUserName] = useState(JSON.parse(localStorage.getItem('UserName')))



  // useEffect(() => {
  //   // const { name, room } = queryString.parse(location.search);

  //   socket = io(apiWithoutUser, {
  //     // withCredentials:true,
  //   });
  //   console.log(socket)
  //   if (user) {
  //     socket.emit('setUpSocket', { user_id: user._id }, (error) => {
  //       if (error) {
  //         alert(error);
  //       }
  //     });
  //   }

  // }, [user]);



  const clickMovedOnUsertoApp = () => {
    setNexPage(!nextpage)
  }
  const clickPostNewstoApp = (nextpage) => {
    console.log('nextpage', nextpage)
    // if (nextpage) this.setState({
    //   nextpage: !this.state.nextpage
    // });
  }
  const ClickGoHome = () => {
    // this.setState({
    //   nextpage: !this.state.nextpage,
    //   stateFiterandslide_img: false
    // })
    setNexPage(!nextpage)
    setStateFiterandSlide_img(false)
  }
  const NewsDetailtoApp = () => {
    // this.setState({
    //   stateFiterandslide_img: true
    // });
    setStateFiterandSlide_img(true)
  }
  const StateFiterandslide = () => {
    // this.setState({
    //   stateFiterandslide_img: false
    // });
    // setStateFiterandSlide_img(true)
  }
  // Trạng tháng của filter
  const StateFiterTyhomeNews = () => {
    // this.setState({
    //   statefilter: true,
    //   NewsFilter: [],
    //   clickFindNews: false,
    //   typenews_menu: '',
    //   NameCityFilter: [],
    //   NameDistrictsFilter: []

    // });
    setStatefilter(true)
    setNewsFilter([])
    setClickFindNews(false)
    setTypeNews_Menu('')
    setNameCityFilter([])
    setNameDistrictsFilter([])
  }

  const getFilter = (data) => {
    console.log('data', data)
    setNewsFilter(data)
    setClickFindNews(true)
  }

  const StateFiterTyhomeNews_F = (value) => {
    // this.setState({
    //   statefilter: false,
    //   typenews_menu: value
    // });
    setStatefilter(false)
    setTypeNews_Menu(value)
  }
  const GetNewsFilter = (NewsFilter, NameCityFilter, NameDistrictsFilter, clickFindNews) => {
    // this.setState({
    //   NewsFilter: NewsFilter,
    //   clickFindNews: clickFindNews,
    //   NameCityFilter: NameCityFilter,
    //   NameDistrictsFilter: NameDistrictsFilter
    // })
    setNewsFilter(NewsFilter)
    setClickFindNews(clickFindNews)
    setNameCityFilter(NameCityFilter)
    setNameDistrictsFilter(NameDistrictsFilter)
  }

  const ListNewsReset = () => {
    setNewsFilter([])
    setClickFindNews(false);
    setNameCityFilter([])
    setNameDistrictsFilter([])
    // this.setState({
    //   NewsFilter: [],
    //   clickFindNews: false,
    //   NameCityFilter: [],
    //   NameDistrictsFilter: []

    // });
  }
  const settingUser = () => {
    setUser(JSON.parse(localStorage.getItem('InfoUser')))
  }
  const logout = () => {
    setUser(JSON.parse(localStorage.getItem('InfoUser')))
  }

  const setUpProfileEdit = async () => {
    let res = await authServices.getUserInfo();
    if (res.success) {
      localStorage.setItem('InfoUser', JSON.stringify(res.data))
      localStorage.setItem('UserName', JSON.stringify(res.data.local.username))
      localStorage.setItem('Role', JSON.stringify(res.data.role))
      // console.log('run');
      // setUserName(res.data.local.username)
      // console.log('res.data', res.data)
      // setInfoUser(res.data)
      // setRole(res.data.role)
      settingUser()
    }
  }


  return (
    <div className="App">
      <Context.Provider value={{ user, ClickGoHome, userName, settingUser, logout, getFilter, NewsFilter, setUpProfileEdit }}>
        <Router>
          <Header clickPostNewstoApp={(r) => clickPostNewstoApp(r)}
            clickMovedOnUsertoApp={() => clickMovedOnUsertoApp()}
            stateFiterandslide_imgApp={stateFiterandslide_img} // (True/Faile) Hidden Fitter and slideShow Image
            StateFiterandslide_FuncApp={() => StateFiterandslide()} // Show Fitter and slideShow Image
            StateFiterTyhomeNews_TF={statefilter} // (True/Faile) Hidden Fitter typenews
            GetNewsFiltertoApp={() => GetNewsFilter()}             // get News Filter (Lấy tin từ tìm kiếm)
            GetTypeNewstoApp={typenews_menu}            // Get value type news filter
          />
          <Switch>
            <Route path='/' exact>
              <Home
                NewsDetailtoApp={() => NewsDetailtoApp()}
                StateFiterTyhomeNewstoApp={() => StateFiterTyhomeNews_F()}
                NewsFiltertoApp={NewsFilter}
                clickFindNewstoApp={clickFindNews}
                ListNewsResettoApp={() => ListNewsReset()}
                GetNameCityFiltertoApp={NameCityFilter}
                GetNameDistrictsFiltertoApp={NameDistrictsFilter}
              />
            </Route>

            <Route
              path="/thue-phong-tro"
            // render={props => < ThuePhongTro {...props} NewsDetailtoApp={props.NewsDetailtoApp}
            //   StateFiterTyhomeNews_FtoApp={props.StateFiterTyhomeNews_FtoApp}
            //   NewsFiltertoApp={props.NewsFiltertoApp}
            //   clickFindNewstoApp={props.clickFindNewstoApp}
            //   ListNewsResettoApp={props.ListNewsResettoApp}
            //   GetNameCityFiltertoApp={props.GetNameCityFiltertoApp}
            //   GetNameDistrictsFiltertoApp={props.GetNameDistrictsFiltertoApp} />}
            >
              <Thuenhatro
                NewsDetailtoApp={() => NewsDetailtoApp()}
                StateFiterTyhomeNews_FtoApp={() => StateFiterTyhomeNews_F()}
                StateFiterTyhomeNewstoApp={() => StateFiterTyhomeNews_F()}
                NewsFiltertoApp={NewsFilter}
                clickFindNewstoApp={clickFindNews}
                ListNewsResettoApp={() => ListNewsReset()}
                GetNameCityFiltertoApp={NameCityFilter}
                GetNameDistrictsFiltertoApp={NameDistrictsFilter}
              />
            </Route>
            {/* {props.stateFiterandslide_imgApp && */}
            <Route
              path="/thong-tin-chi-tiet/:slug"
              component={NewsDetail}
            // render={props => < NewsDetail {...props} NewsDetailtoApp={props.NewsDetailtoApp}
            // />}
            />
            {/* } */}
            <Route
              path="/thue-nha-tro"
            >
              <Thuenhatro
                NewsDetailtoApp={() => NewsDetailtoApp()}
                StateFiterTyhomeNews_FtoApp={() => StateFiterTyhomeNews_F()}
                StateFiterTyhomeNewstoApp={() => StateFiterTyhomeNews_F()}
                NewsFiltertoApp={NewsFilter}
                clickFindNewstoApp={clickFindNews}
                ListNewsResettoApp={() => ListNewsReset()}
                GetNameCityFiltertoApp={NameCityFilter}
                GetNameDistrictsFiltertoApp={NameDistrictsFilter}
              />
            </Route>
            <Route
              path="/thue-can-ho"
            // render={props => < ThueCanHo {...props} NewsDetailtoApp={props.NewsDetailtoApp}
            //   StateFiterTyhomeNews_FtoApp={props.StateFiterTyhomeNews_FtoApp}
            //   NewsFiltertoApp={props.NewsFiltertoApp}
            //   clickFindNewstoApp={clickFindNewstoApp}
            //   ListNewsResettoApp={props.ListNewsResettoApp}
            //   GetNameCityFiltertoApp={props.GetNameCityFiltertoApp}
            //   GetNameDistrictsFiltertoApp={props.GetNameDistrictsFiltertoApp} />}
            >
              <ThueCanHo
                NewsDetailtoApp={() => NewsDetailtoApp()}
                StateFiterTyhomeNews_FtoApp={() => StateFiterTyhomeNews_F()}
                StateFiterTyhomeNewstoApp={() => StateFiterTyhomeNews_F()}
                NewsFiltertoApp={NewsFilter}
                clickFindNewstoApp={clickFindNews}
                ListNewsResettoApp={() => ListNewsReset()}
                GetNameCityFiltertoApp={NameCityFilter}
                GetNameDistrictsFiltertoApp={NameDistrictsFilter}
              />
            </Route>
            <Route path="/lien-he" component={Contact} />
            <PrivateRoute path="/nguoi-dung" component={Newshome} />
            <PrivateRoute path="/messenger" component={Messenger} />
            <Route path="/xac-nhan-email" component={ConfirmEmail} />
          </Switch>
          <ChangePassword />
          <Footer />
        </Router>
      </Context.Provider>

    </div >
  );
}
export default App;
