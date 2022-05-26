import React, { Component, useEffect, useState } from 'react';
import './utilities.css'

function Utilities(props) {
    // constructor(props) {
    //     super(props)
    //     state = {
    //         // All utilities
    //         isChecked_wifi: props.utilitiesData?.isChecked_wifi,
    //         isChecked_mezzanine: props.utilitiesData?.isChecked_mezzanine,
    //         isChecked_camera: props.utilitiesData?.isChecked_camera,
    //         isChecked_parking: props.utilitiesData?.isChecked_parking,
    //         //Nhà và căn hộ
    //         isChecked_fridge: props.utilitiesData?.isChecked_fridge,
    //         isChecked_WashingMachine: props.utilitiesData?.isChecked_WashingMachine,
    //         isChecked_television: props.utilitiesData?.isChecked_television,
    //         isChecked_AirConditional: props.utilitiesData?.isChecked_AirConditional,
    //         isChecked_elevator: props.utilitiesData?.isChecked_elevator,
    //         isChecked_pool: props.utilitiesData?.isChecked_pool,
    //         isChecked_park: props.utilitiesData?.isChecked_park,
    //         isChecked_mattress: props.utilitiesData?.isChecked_mattress,
    //     }

    // }
    // ALL
    const [isChecked_wifi, setIsCheckEd_Wifi] = useState(props.utilitiesData?.isChecked_wifi);
    const [isChecked_mezzanine, setIsCheckEd_Mezzanine] = useState(props.utilitiesData?.isChecked_mezzanine);
    const [isChecked_camera, setIsCheckEd_Camera] = useState(props.utilitiesData?.isChecked_camera);
    const [isChecked_parking, setIsCheckEd_Parking] = useState(props.utilitiesData?.isChecked_parking);
    //NHÀ VÀ CĂN HỘ
    const [isChecked_fridge, setIsChecked_Fridge] = useState(props.utilitiesData?.isChecked_fridge);
    const [isChecked_WashingMachine, setIsChecked_WashingMachine] = useState(props.utilitiesData?.isChecked_WashingMachine);
    const [isChecked_television, setIsChecked_Television] = useState(props.utilitiesData?.isChecked_television);
    const [isChecked_AirConditional, setIsCheckEd_AirConditional] = useState(props.utilitiesData?.isChecked_AirConditional);
    const [isChecked_elevator, setIsCheckEd_Elevator] = useState(props.utilitiesData?.isChecked_elevator);
    const [isChecked_pool, setIsCheckEd_Pool] = useState(props.utilitiesData?.isChecked_pool);
    const [isChecked_park, setIsCheckEd_Park] = useState(props.utilitiesData?.isChecked_park);
    const [isChecked_mattress, setIsCheckEd_Mattress] = useState(props.utilitiesData?.isChecked_mattress);

    useEffect(()=>{
        getValueIsChecked()
    },[isChecked_AirConditional,isChecked_WashingMachine,isChecked_camera,isChecked_elevator,isChecked_elevator,isChecked_fridge,
        isChecked_mattress,isChecked_mezzanine,isChecked_park,isChecked_parking,isChecked_pool,isChecked_television,isChecked_wifi])


    function getValueIsChecked() {
        // console.log("run");
        let utilities_typehome_roomhome = {
            isChecked_wifi: isChecked_wifi,
            isChecked_mezzanine: isChecked_mezzanine,
            isChecked_camera: isChecked_camera,
            isChecked_parking: isChecked_parking,
            //
            isChecked_fridge: false,
            isChecked_WashingMachine: false,
            isChecked_television: false,
            isChecked_AirConditional: false,
            isChecked_elevator: false,
            isChecked_pool: false,
            isChecked_park: false,
            isChecked_mattress: false,
        }
        let utilities_typehome_NTCH = {
            isChecked_wifi: isChecked_wifi,
            isChecked_mezzanine: isChecked_mezzanine,
            isChecked_camera: isChecked_camera,
            isChecked_parking: isChecked_parking,
            //
            isChecked_fridge: isChecked_fridge,
            isChecked_WashingMachine: isChecked_WashingMachine,
            isChecked_television: isChecked_television,
            isChecked_AirConditional: isChecked_AirConditional,
            isChecked_elevator: isChecked_elevator,
            isChecked_pool: isChecked_pool,
            isChecked_park: isChecked_park,
            isChecked_mattress: isChecked_mattress,
        }
        if (props.typehome === 1) {
            props.getValueUtilities(utilities_typehome_roomhome);
        } else { props.getValueUtilities(utilities_typehome_NTCH); }
    }

    const toggleChange_wifi = () => {
        //  setState({
        //     isChecked_wifi: !isChecked_wifi
        // })
        setIsCheckEd_Wifi(!isChecked_wifi)
        //getValueIsChecked();

    }
    const toggleChange_mezzanine = () => {
        // setState({
        //     isChecked_mezzanine: !isChecked_mezzanine
        // })
        setIsCheckEd_Mezzanine(!isChecked_mezzanine)
        //getValueIsChecked();

    }
    const toggleChange_camera = () => {
        // setState({
        //     isChecked_camera: !isChecked_camera
        // })
        setIsCheckEd_Camera(!isChecked_camera)
        //getValueIsChecked();

    }
    const toggleChange_parking = () => {
        // setState({
        //     isChecked_parking: !isChecked_parking
        // })
        setIsCheckEd_Parking(!isChecked_parking)
        //getValueIsChecked();

    }
    const toggleChange_fridge = () => {
        // setState({
        setIsChecked_Fridge(!isChecked_fridge)
        // })
        // //getValueIsChecked();

    }
    const toggleChange_WashingMachine = () => {
        // setState({
        setIsChecked_WashingMachine(!isChecked_WashingMachine)
        // })
        // //getValueIsChecked();

    }
    const toggleChange_television = () => {
        // setState({
        setIsChecked_Television(!isChecked_television)
        // getValueIsChecked()
        // })
    }
    const toggleChange_AirConditional = () => {
        // setState({
        //     isChecked_AirConditional: !isChecked_AirConditional
        // })
        setIsCheckEd_AirConditional(!isChecked_AirConditional)
        // //getValueIsChecked();

    }
    const toggleChange_elevator = () => {
        // setState({
        //     isChecked_elevator: !isChecked_elevator
        // })
        setIsCheckEd_Elevator(!isChecked_elevator)
        // //getValueIsChecked();

    }
    const toggleChange_mattress = () => {
        // setState({
        //     isChecked_mattress: !isChecked_mattress
        // })
        setIsCheckEd_Mattress(!isChecked_mattress)
        // //getValueIsChecked();

    }
    const toggleChange_pool = () => {
        // setState({
        //     isChecked_pool: !isChecked_pool
        // })
        setIsCheckEd_Pool(!isChecked_pool)
        // //getValueIsChecked();

    }
    const toggleChange_park = async () => {
        // setState({
        //     isChecked_park: !isChecked_park
        // })
        await setIsCheckEd_Park(!isChecked_park)
        // //getValueIsChecked();

    }
    // console.log('data', props.utilitiesData)
    return (

        <div className="row image_news  wow fadeInUp" data-wow-delay="0.1s">
            <div className="row image_news_title">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <h2 className="info_news_div-h2">Tiện ích</h2>
                </div>
            </div>
            <div className="row utilities-checkbox">

                {/* Chung cho cac the loai */}
                <div className="col-md-3 col-sm-3 col-xs-6">
                    <label className="container-checkbox">Wifi
                        <input type="checkbox"
                            checked={isChecked_wifi}
                            onChange={toggleChange_wifi} />
                        <span className="checkmark" />
                    </label>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6">
                    <label className="container-checkbox">Gác lửng
                        <input type="checkbox"
                            checked={isChecked_mezzanine}
                            onChange={toggleChange_mezzanine} />
                        <span className="checkmark" />
                    </label>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6">
                    <label className="container-checkbox">Camera an ninh
                        <input type="checkbox"
                            checked={isChecked_camera}
                            onChange={toggleChange_camera} />
                        <span className="checkmark" />
                    </label>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6">
                    <label className="container-checkbox">Bãi để xe
                        <input type="checkbox"
                            checked={isChecked_parking}
                            onChange={toggleChange_parking} />
                        <span className="checkmark" />
                    </label>
                </div>
                {/* Cho the loai nha nguyen can / can ho */}
                {props.open_selectoption_NT_CH &&
                    <div className="row">
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <label className="container-checkbox">Tủ lạnh
                                <input type="checkbox"
                                    checked={isChecked_fridge}
                                    onChange={toggleChange_fridge} />
                                <span className="checkmark" />
                            </label>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <label className="container-checkbox">Máy giặt
                                <input type="checkbox"
                                    checked={isChecked_WashingMachine}
                                    onChange={toggleChange_WashingMachine} />
                                <span className="checkmark" />
                            </label>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <label className="container-checkbox">Ti vi
                                <input type="checkbox"
                                    checked={isChecked_television}
                                    onChange={toggleChange_television} />
                                <span className="checkmark" />
                            </label>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <label className="container-checkbox">Điều hòa
                                <input type="checkbox"
                                    checked={isChecked_AirConditional}
                                    onChange={toggleChange_AirConditional} />
                                <span className="checkmark" />
                            </label>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <label className="container-checkbox">Thang máy
                                <input type="checkbox"
                                    checked={isChecked_elevator}
                                    onChange={toggleChange_elevator} />
                                <span className="checkmark" />
                            </label>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <label className="container-checkbox">Giường nệm
                                <input type="checkbox"
                                    checked={isChecked_mattress}
                                    onChange={toggleChange_mattress} />
                                <span className="checkmark" />
                            </label>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <label className="container-checkbox">Hồ bơi
                                <input type="checkbox"
                                    checked={isChecked_pool}
                                    onChange={toggleChange_pool} />
                                <span className="checkmark" />
                            </label>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <label className="container-checkbox">Công viên
                                <input type="checkbox"
                                    checked={isChecked_park}
                                    onChange={toggleChange_park} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}


export default Utilities;