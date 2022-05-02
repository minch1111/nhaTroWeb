import React, { Component, createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
export const Context = createContext();

function App() {

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



  // constructor() {
  //   super();
  //   this.state = {
  //     nextpage: false,
  //     stateFiterandslide_img: false,
  //     statefilter: false,
  //     NewsFilter: [],
  //     NameCityFilter: [],
  //     NameDistrictsFilter: [],
  //     clickFindNews: false,
  //     typenews_menu: '',
  //     user: JSON.parse(localStorage.getItem('InfoUser'))
  //   }
  // }


  const clickMovedOnUsertoApp = () => {
    // this.setState({
    //   nextpage: !this.state.nextpage
    // });
    setNexPage(!nextpage)
  }
  const clickPostNewstoApp = (nextpage) => {
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

  return (
    <div className="App">
      <Context.Provider value={{ user, ClickGoHome, userName, settingUser, logout }}>
        <Router>
          <Header clickPostNewstoApp={() => clickPostNewstoApp()}
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
              path="/trang-chu/thong-tin-chi-tiet/:id"
              component={NewsDetail}
            // render={props => < NewsDetail {...props} NewsDetailtoApp={props.NewsDetailtoApp}
            // />}
            />
            {/* } */}
            <Route
              path="/thue-nha-tro"
            // render={props => < ThueNhaTro {...props} NewsDetailtoApp={props.NewsDetailtoApp}
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
            {/* <RouterWeb NewsDetailtoApp={()=>NewsDetailtoApp()}
                  stateFiterandslide_imgApp={stateFiterandslide_img} // (True/Faile) Hidden Fitter and slideShow Image
                  StateFiterTyhomeNewstoApp={()=>StateFiterTyhomeNews()}          // Show Fitter and slideShow Image
                  StateFiterTyhomeNews_FtoApp={()=>StateFiterTyhomeNews_F()}
                  StateNextPage={nextpage}                           //Giử trạng thái next page Home sang HomeNews
                  GetNameCityFiltertoApp={NameCityFilter}                   // Truyền Array chứa tên thành phố khi tìm kiếm
                  GetNameDistrictsFiltertoApp={NameDistrictsFilter}        // Truyền Array chứa tên quận huyện khi tìm kiếm
                  NewsFiltertoApp={NewsFilter}                             // News Filter
                  clickFindNewstoApp={clickFindNews}                            //(True/Faile)  Click button Find News
                  ListNewsResettoApp={()=>ListNewsReset()}
                /> */}

            <PrivateRoute path="/nguoi-dung/dang-tin-moi" component={Newshome} />
          </Switch>
          <ChangePassword />
          <Footer />
        </Router>
      </Context.Provider>

    </div >
  );
}
export default App;
