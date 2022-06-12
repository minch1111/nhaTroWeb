import React, { Component, useEffect, useState } from 'react';
import img_icon_menu from '../header/image_header/icons_menu.png'
import { NavLink, Link } from "react-router-dom";
let $ = window.$
function Menu(props) {
    // constructor(props) {
    //     super(props);
    //     this.state={
    //         scrolled:false,
    //     }
    // }

    const [scrolled, setScrolled] = useState(false)
    // componentDidMount(){
    //     window.addEventListener('scroll',()=>{
    //         const isTop = window.scrollY < 150;
    //         if(isTop !==true) {
    //             this.setState({
    //                 scrolled:true
    //             })
    //         }
    //         else this.setState({scrolled:false})
    //     });
    // }
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 150;
            if (isTop !== true) {
                setScrolled(true)
            }
            else  setScrolled(false)
        });
    }, [])
    const collaped =()=>{
        const close =document.querySelector('.navbar-toggler')
        close.click()
    }
    return (
        <div className={!props.stateFiterandslide_imgApp ?
            "col-md-12 col-sm-12 col-xs-12 header2-menu "
            : "col-md-12 col-sm-12 col-xs-12 header2-menu_detail_news"}>
            <nav className={!scrolled ? "navbar navbar-expand-lg header2-menu-nav" : "navbar navbar-expand-lg header2-menu-nav-fixed"} id="stickyHeader">
                <Link className="navbar-brand" to="/">Phòng Trọ Sinh Viên</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                        <img src={img_icon_menu} alt="icomn_menu"></img>
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link header2-menu-nav-item" activeClassName="header2-menu-nav-item-active" to='/' onClick={()=>collaped()} >Trang chủ</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link header2-menu-nav-item" to='/thue-phong-tro' activeClassName="header2-menu-nav-item-active" onClick={()=>collaped()} >Thuê Phòng trọ</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link header2-menu-nav-item" activeClassName="header2-menu-nav-item-active" to='/thue-nha-tro' onClick={()=>collaped()} >Thuê nhà nguyên căn</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link header2-menu-nav-item" activeClassName="header2-menu-nav-item-active" to='/thue-can-ho'onClick={()=>collaped()} >Thuê căn hộ</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link header2-menu-nav-item" activeClassName="header2-menu-nav-item-active" to='/lien-he'onClick={()=>collaped()} >Liên hệ</NavLink>
                        </li> */}
                    </ul>
                </div>
            </nav>

        </div>
    );
}


export default Menu;