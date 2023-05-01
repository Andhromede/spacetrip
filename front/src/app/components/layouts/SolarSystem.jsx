import React from "react";
import '../../assets/styles/components/SolarSystem.css';



const SolarSystem = () => {
    
        // let body = document.getElementById("body");
        // let universe = document.getElementById("universe");
        // let solarsys = document.getElementById("solar-system");

        // var init = function() {
        //   body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function() {
        //     this.removeClass('hide-UI').addClass("set-speed");
        //     this.dequeue();
        //   });
        // };

        // var setView = function(view) { universe.removeClass().addClass(view); };

        // document.getElementById("toggle-data").click(function(e) {
        //   body.toggleClass("data-open data-close");
        //   e.preventDefault();
        // });

        // document.getElementById("toggle-controls").click(function(e) {
        //   body.toggleClass("controls-open controls-close");
        //   e.preventDefault();
        // });

        // document.getElementById("data a").click(function(e) {
        //   var ref = $(this).attr("className");
        //   solarsys.removeClass().addClass(ref);
        //   this.parent().find('a').removeClass('active');
        //   this.addClass('active');
        //   e.preventDefault();
        // });

        // document.getElementsByClassName("set-view").click(function() { body.toggleClass("view-3D view-2D");});
        // document.getElementsByClassName("set-zoom").click(function() { body.toggleClass("zoom-large zoom-close");});
        // document.getElementsByClassName("set-speed").click(function() { setView("scale-stretched set-speed");});
        // document.getElementsByClassName("set-size").click(function() { setView("scale-s set-size");});
        // document.getElementsByClassName("set-distance").click(function() { setView("scale-d set-distance");});
        // init();

    

    let timestamp_start = new Date("2019-01-01").getTime();
    let timestamp_now = new Date().getTime();
    let secondsLeft = (timestamp_now - timestamp_start) / 1000;
    let root = document.documentElement;
    root.style.setProperty('--seconds-left', `${secondsLeft}s`);

    return (
        <>
            <div className="opening hide-UI view-3D zoom-large data-close controls-close" id="container">
                <div id="navbar">
                    <a id="toggle-data" href="#data"><i className="icon-data"></i>Data</a>
                    <h1>3D Solar System</h1>
                    <a id="toggle-controls" href="#controls"><i className="icon-controls"></i>Controls</a>
                </div>

                <div id="data">
                    <a className="sun" title="sun" href="#sunspeed">Sun</a>
                    <a className="mercury" title="mercury" href="#mercuryspeed">Mercury</a>
                    <a className="venus" title="venus" href="#venusspeed">Venus</a>
                    <a className="earth active" title="earth" href="#earthspeed">Earth</a>
                    <a className="mars" title="mars" href="#marsspeed">Mars</a>
                    <a className="jupiter" title="jupiter" href="#jupiterspeed">Jupiter</a>
                    <a className="saturn" title="saturn" href="#saturnspeed">Saturn</a>
                    <a className="uranus" title="uranus" href="#uranusspeed">Uranus</a>
                    <a className="neptune" title="neptune" href="#neptunespeed">Neptune</a>
                </div>

                <div id="controls">
                    <label className="set-view">
                        <input type="checkbox" />
                    </label>

                    <label className="set-zoom">
                        <input type="checkbox" />
                    </label>

                    <label>
                        <input type="radio" className="set-speed" name="scale" />
                        <span>Speed</span>
                    </label>

                    <label>
                        <input type="radio" className="set-size" name="scale" />
                        <span>Size</span>
                    </label>

                    <label>
                        <input type="radio" className="set-distance" name="scale" />
                        <span>Distance</span>
                    </label>
                </div>

                <div id="universe" className="scale-stretched">
                    <div id="galaxy">
                        <div id="solar-system" className="earth">
                            <div id="mercury" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Mercury</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div id="venus" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Venus</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div id="earth" className="orbit">
                                <div className="pos">
                                    <div className="orbit">
                                        <div className="pos">
                                            <div className="moon"></div>
                                        </div>
                                    </div>
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Earth</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div id="mars" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Mars</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="jupiter" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Jupiter</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div id="saturn" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <div className="ring"></div>
                                        <dl className="infos">
                                            <dt>Saturn</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div id="uranus" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Uranus</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div id="neptune" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Neptune</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div id="sun">
                                <dl className="infos">
                                    <dt>Sun</dt>
                                    <dd><span></span></dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SolarSystem;
