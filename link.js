import React, { Component, useState } from 'react';
import { Navbar, Row, Nav, Col, NavLink } from 'react-bootstrap';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Switch from 'react-switch';
import MyComponent from './test';
import SearchBox from './searchBar';
import SearchCard from './SearchCards';
import BookMarkCards from './BookMarkCards';
import DetailedArticle from './DetailedArticle';
import ReactTooltip from 'react-tooltip';
import { Link, BrowserRouter as Router, Route, withRouter} from "react-router-dom";

// const [expanded, setExpanded] = useState(false);



class MainNav extends Component {


    

    constructor() {
        super();
        this.state = {
            checked: JSON.parse(localStorage.getItem("source")),
            category: "",
            queryString:null,
            articleId:"",
            idx:0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlerQueryParam = this.handlerQueryParam.bind(this);
        this.handlerArticleId = this.handlerArticleId.bind(this);
        this.handlerSource = this.handlerSource.bind(this);
      

    }

    handlerQueryParam(query) {
        this.setState({
            queryString: query
        })
    }

   


    

    handlerArticleId(articleId) {
        this.setState({
            articleId: articleId
        })
    }

    handlerSource(source) {
        if(source==="NYTimes") this.setState({checked: false})
        else this.setState({ checked: true });
    }

    handleChange(checked) {
        console.log("Want to check reload "+checked);
        localStorage.setItem("source",JSON.stringify(checked));
        this.setState({ checked });

    }

    handleClick = param => e => {
        e.preventDefault();
        this.setState({ category: param });
        return param;
    }

    componentDidUpdate(){
        console.log("check for update");
    }
   
    componentWillMount() {
       // window.addEventListener('resize', this.handleWindowSizeChange);
    }

    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.handleWindowSizeChange);
    // }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    

    //__________________________________________________________________________

    

    colourOptions = [
        { label: "coronavirus", value: 1 },
        { label: "trump", value: 2 },
        { label: "india", value: 3 },
        { label: "google", value: 4 },
        { label: "brooklyn", value: 5 },
        { label: "time", value: 6 },
    ];



        //__________________________________________________________________________


    render() {
        function getSource(checked) {
            if (checked) return "Guardian";
            else return "NYTimes";
        }

        console.log("-----------> "+this.state.bookmark);

        
        return (
            <>
                <Router basename="/#">

                    <Navbar id="responsive-navbar-nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
                        
                    <div className="search-bar" style={{ overflow: "visible" , padding: "0px"}}>
                        <Row>
                                <Col xs={9} sm={3} style={{ marginTop: "4px"}}>     
                                    <SearchBox defaultOptions={this.colourOptions} source={getSource(this.state.checked)} onChange={this.test} handler={this.handlerQueryParam}></SearchBox>
                                    
                            </Col>
                            <Col xs={0} style={{marginTop: "4px", float:"right"}}>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            </Col>
        

                            <Col xs={5} sm={9} style={{float: "right"}}>
                                <Navbar.Collapse>
                                        <Nav className="mr-auto" style={{ marginBottom: "5px"}}>
                                            <Nav.Link as={Link} eventKey="1" to="/" >Home</Nav.Link>
                                            <Nav.Link as={Link} eventKey="2" to="/world" >World</Nav.Link>
                                            <Nav.Link as={Link} eventKey="3" to="/politics">Politics</Nav.Link>
                                            <Nav.Link as={Link} eventKey="4" to="/business">Business</Nav.Link>
                                            <Nav.Link as={Link} eventKey="5" to="/technology">Technology</Nav.Link>
                                            <Nav.Link as={Link} eventKey="6" to="/sports">Sports</Nav.Link>
                                        </Nav>
                                    <Nav style={{paddingLeft: "0px !important"}}>    
                                        <Nav.Link eventKey="7" style={{ padding: "0px" }}><Link to="/favorites"><FaBookmark id="bk-fill" data-tip="Bookmark" style={{ margin: "0px" }}data-for="favorites" className="bookmark1" /></Link></Nav.Link>
                                        <Nav.Link eventKey="8" style={{ padding: "0px" }}><Link eventKey="7" to="/favorites"><FaRegBookmark id="bk-outline" data-tip="Bookmark" data-for="favorites" className="bookmark" /></Link></Nav.Link>
                                        <ReactTooltip id="favorites" place="bottom" type="dark" effect="solid" />
                                        <span style={{ padding: "0px" }}className="news-type">NYTimes</span>
                                        <Nav.Link eventKey="9" style={{padding: "0px"}}>
                                                <span id="switch-toggle"><Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    handleDiameter={25}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={20}
                                                    width={46}
                                                    className="react-switch"
                                                    id="material-switch"
                                                /></span>
                                        </Nav.Link>
                                        <span style={{ padding: "0px" }} className="news-type">Guardian</span>
                                    </Nav>
                                </Navbar.Collapse>
                            </Col>
                        </Row>

                    </div>
                </Navbar>
                    <Route exact path="/" component={() => <div id="news-card-id1"><MyComponent source={getSource(this.state.checked)} category="home" key={Math.random()} handler={this.handlerArticleId}></MyComponent></div>}>
                    </Route>
                    <Route exact path="/world" component={() => <div id="news-card-id1"><MyComponent source={getSource(this.state.checked)} category="world" key={Math.random()} handler={this.handlerArticleId}></MyComponent></div>}>
                    </Route>
                    <Route path="/politics" component={() => <div id="news-card-id2"><MyComponent source={getSource(this.state.checked)} category="politics" key={Math.random()} handler={this.handlerArticleId}></MyComponent></div>} render={() => console.log('Entered politics')}></Route>
                    <Route path="/business" component={() => <div id="news-card-id3"><MyComponent source={getSource(this.state.checked)} category="business" key={Math.random()} handler={this.handlerArticleId}></MyComponent></div>}></Route>
                    <Route path="/technology" component={() => <div id="news-card-id4"><MyComponent source={getSource(this.state.checked)} category="technology" key={Math.random()} handler={this.handlerArticleId}></MyComponent></div>}></Route>
                    <Route path="/sports" component={() => <div id="news-card-id5"><MyComponent source={getSource(this.state.checked)} category="sports" key={Math.random()} handler={this.handlerArticleId}></MyComponent></div>}></Route>

                    <Route path="/search" component={() => <div id="news-card-id6"><SearchCard source={getSource(this.state.checked)} query={this.state.queryString} key={Math.random()} handler={this.handlerArticleId}></SearchCard></div>}></Route>
                    <Route path="/article" component={() => <DetailedArticle articleId={this.state.articleId} source={getSource(this.state.checked)} key={Math.random()}/>}></Route>
                    <Route path="/favorites" component={() => <BookMarkCards key={Math.random()} handler1={this.handlerSource} handler2={this.handlerArticleId}/>}></Route>
                    
                </Router>
                



            </>
        )
    }
}

export default MainNav;
