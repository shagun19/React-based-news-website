import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SharingModal from './sharing-modal';
import { withRouter } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';



class BookMarkCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            checked: "",
            empty: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.removeBookMark = this.removeBookMark.bind(this);
    }

    handleClick = (param,source) => e => {
        e.preventDefault();
        var searchPath = "/article?id=" + param;
        this.props.handler1(source);
        this.props.handler2(param);
        console.log("providing "+param+" with source "+ source);
        this.props.history.push(searchPath);
    }

    removeBookMark = (id,title) => e => {
        e.preventDefault();
        localStorage.removeItem(id);
        console.log("here for check toast");
        toast("Removing " + title, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
        var len=0;
        for(var i=0;i<localStorage.length;i++){
            var key = localStorage.key(i);
            if(key!=="source"){
                ++len;
            }
        }
        if(len===0){
            //this.setState({empty:true})
            document.getElementById("heading").innerHTML="You have no saved articles";
            document.getElementById("heading").setAttribute("style","text-align:center;")
        }
        // else{
        //     document.getElementById("row").removeChild(document.getElementById(id));
        // }
         document.getElementById("row").removeChild(document.getElementById(id));
    }

    componentDidMount() {
        document.getElementById("bk-fill").setAttribute("class","bookmark");
        document.getElementById("bk-fill").setAttribute("style", "margin-right: 25px;");

         document.getElementById("bk-outline").setAttribute("class", "display-none1");

        // document.getElementById("white-fill").setAttribute("class", "bookmark");

        var len = localStorage.length;
        var actualLen = 0;
        var i;
        var results = [];
        for (i = 0; i < len; i++) {
            var key = localStorage.key(i);
            if (key!=="source"){
                var temp = JSON.parse(localStorage.getItem(key));
                results.push(temp);
                actualLen++;
            } 
        }
        if (actualLen === 0) this.setState({ empty: true });
        this.setState({ items: results });      
        
    }

    render() {
        if (document.getElementsByClassName(" css-1uccc91-singleValue")[0] != null) {
            document.getElementsByClassName(" css-1uccc91-singleValue")[0].innerHTML = "Enter keyword ..";
            document.getElementsByClassName(" css-1uccc91-singleValue")[0].setAttribute("style", "color: grey;");
        }
        var numCard = 0;
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key !== "source") {
                ++numCard;
            }
        }
        if (document.getElementsByClassName("news-type")[0] != null) {
            document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
            document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
            document.getElementById("switch-toggle").setAttribute("class", "display-none");
        }
        const items = this.state.items;
        const newsCard = {
            "border": "1px solid #bbbfbc",
            "padding": "10px",
            "border-radius": "4px",
            "box-shadow": "0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
            "margin-top": "15px",
            "margin-left": "1px",
            "margin-right": "1px",
            "cursor": "pointer",
            "overflow-x": "hidden", /* Hide horizontal scrollbar */
            "overflow-y": "hidden"
        }
        function sectionColor(sectionColor) {
            var section = sectionColor.toLowerCase();
            if (section === "world") {
                return { "backgroundColor": "purple", "color": "white" };
            }
            else if (section === "politics") {
                return { "backgroundColor": "green", "color": "white" };
            }
            else if (section === "business") {
                return { "backgroundColor": "lightblue", "color": "white" };
            }
            else if (section === "technology") {
                return { "backgroundColor": "lightgreen", "color": "black" };
            }
            else if (section === "sports" || section === "sport") {
                return { "backgroundColor": "yellow", "color": "black" };
            }
            else {
                return { "backgroundColor": "gray", "color": "black", "float":"right" };
            }
        }

        function sourceColor(source){
            if (source === "NYTimes") return {"backgroundColor": "#9A9B99", "color": "black" };
            else return { "backgroundColor": "#020C5D", "color": "white" };
        }

        function findWideImage(imageObj) {
            var i;
            var url = "";
            for (i = 0; i < imageObj.length; i++) {
                if (imageObj[i].width >= 2000) {
                    url = "https://static01.nyt.com/" + imageObj[i].url;
                    break;
                }
            }
            if (url === "") url = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            return url;
        }

        function findValidAssetGuardian(imageObj) {
            if (imageObj.length !== 0) return true;
            else return false;
        }

        const testStyle = {
            "fontStyle": "italic",
            "fontWeight": "bold",
            "fontSize": "18px",
            "marginBottom": "5px"
        }

        const imgStyle = {
            "width": "100%",
            "height": "auto",
            "padding": "4px"
        }
        console.log(items);
        if(numCard===0){
            return(
                <>
                <div>
                        <ToastContainer className="toast"
                            position="top-right"
                            autoClose={2000}
                            hideProgressBar
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnVisibilityChange
                            draggable={false}
                            pauseOnHover
                        />
                </div>
                
                <Container fluid="xs" style={{ overflow: "hidden" }}>
                    
                    <h2 style={{ textAlign: "center" }}>You have no saved articles</h2>
                </Container>
                </>
            );
            
        }
        return (
            <>
            <div style={{ padding: "15px" }}>
            <Container fluid="xs" style={{ overflow: "hidden" }}>
                <ToastContainer className="toast"
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable={false}
                    pauseOnHover
                />
                <h2 id="heading">Favorites</h2>
                <Row id="row">
                    {items.map(item => (
                        <Col xs={12} sm={6} lg={3}id={item.id}>
                            <div style={newsCard} onClick={this.handleClick(item.id,item.source)}>
                                <p style={testStyle}>{item.title}
                                    <span onClick={e => e.stopPropagation()}><SharingModal url={item.url} title={item.title} source={item.source}/><FaTrashAlt onClick={this.removeBookMark(item.id, item.title)}/>
                                    </span>
                                </p>
                                <img src={item.img} style={imgStyle}></img>
                                {/* <p style={{ margin: "auto", fontStyle: "italic", fontSize: "13px" }}>
                                    {item.pub_date}<span className='section-search-card' style={sectionColor(item.section)}>{item.section.toUpperCase()}</span><span style={sourceColor(item.source)} className="source-bg">{item.source.toUpperCase()}</span></p> */}
                                <Row style={{ margin: "auto", fontStyle: "italic", fontSize: "14px" }}>
                                    {item.pub_date}<div style={{ float: "right", marginRight: "2px", marginLeft: "auto" }}><div className='section-search-card' style={sectionColor(item.section)}>{item.section.toUpperCase()}</div><div style={sourceColor(item.source)} className="source-bg">{item.source.toUpperCase()}</div></div>
                                    </Row>
                                
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
            </div>
            </>

        );
        }
    }

export default withRouter(BookMarkCard);
