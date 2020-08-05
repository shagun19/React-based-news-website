import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import SharingModal from './sharing-modal';
import DetailedArticle from './DetailedArticle';
import {findWideImage} from './test';
import {withRouter} from 'react-router-dom';
import LoadSpinner from './spinner';



class SearchCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            checked: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = param => e => {
        e.preventDefault();
        this.setState({ checked: param });
        this.props.handler(param);
        if(document.getElementsByClassName("news-type")[0]!=null){
            document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
            document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
            document.getElementById("switch-toggle").setAttribute("class", "display-none");
        }
        var searchPath = "/article?id=" + param;
        this.props.history.push(searchPath);
    }

    componentDidMount() {
        var domain = "https://newsapp-backend-api.ue.r.appspot.com/";
        if (document.getElementsByClassName("  css-1uccc91-singleValue")[0]!=null){
            document.getElementsByClassName("  css-1uccc91-singleValue")[0].setAttribute("style", "color: black;");
        }
        

        if (document.getElementsByClassName("news-type")[0] != null) {
            document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
            document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
            document.getElementById("switch-toggle").setAttribute("class", "display-none");
        }
        console.log("Test here "+this.props.query+" "+this.props.source);
        var url;
        var obtainedQueryString = window.location.href.split("=")[1];
        if (this.props.source === "NYTimes") url = domain+"nytimes-search/";
        else url = domain+"guardian-search/";
        if (this.props.query !== "") url = url + this.props.query;
        else url = url + obtainedQueryString;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (this.props.source === "NYTimes") {
                        this.setState({
                            isLoaded: true,
                            items: result.response.docs.slice(0, 10)

                        });
                    }
                    else {
                        this.setState({
                            isLoaded: true,
                            items: result.response.results.slice(0,10)
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        console.log(this.state.items);
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
                return { "backgroundColor": "gray", "color": "black" };
            }
        }

        function findWideImage(imageObj) {
            var i;
            var url = "";
            for (i = 0; i < imageObj.length; i++) {
                if (imageObj[i].width >= 2000) {
                    url = "https://static01.nyt.com/"+imageObj[i].url;
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

        const { error, isLoaded, items } = this.state;
        const newsCard={
            "border": "1px solid #bbbfbc",
            "padding": "10px",
            "border-radius": "4px",
            "box-shadow": "0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
            "margin-top": "15px",
            "margin-left": "5px",
            "margin-right": "2px",
            "cursor": "pointer",
            "overflow-x": "hidden", /* Hide horizontal scrollbar */
        "overflow-y": "hidden"
        }
        const div = {
            "margin": "15px",
            "cursor": "pointer"
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

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <LoadSpinner/>
        } else {
            var newsCardObj = {};
            if (this.props.source === "NYTimes") {
                newsCardObj.multimedia = "item.multimedia";
                newsCardObj.title = "item.headline.main";
                newsCardObj.publishedDate = "item.pub_date.slice(0, 10)";
                newsCardObj.section = "item.section_name";
                newsCardObj.img = "findWideImage(item.multimedia)";
                newsCardObj.url = "item.web_url";
                newsCardObj.id = "item.web_url";
            }
            else if (this.props.source === "Guardian") {
                newsCardObj.multimedia = "findValidAssetGuardian(item.blocks.main.elements[0].assets)";
                newsCardObj.title = "item.webTitle";
                newsCardObj.publishedDate = "item.webPublicationDate.slice(0, 10)";
                newsCardObj.section = "item.sectionName";
                newsCardObj.img = "item.blocks.main.elements[0].assets[item.blocks.main.elements[0].assets.length-1].file";
                newsCardObj.url = "item.webUrl";
                newsCardObj.id = "item.id";
            }
            console.log(newsCardObj);
            return (
                <div style={{padding: "15px"}}>
                <Container fluid="xs" style={{ overflow: "hidden"}}>
                <h2>Results</h2>
                <Row>
                    {items.map(item => (
                        <Col xs={12} sm={6} lg={3}>
                            <div style={newsCard} onClick={this.handleClick(eval(newsCardObj.id))}>
                                <p style={testStyle}>{eval(newsCardObj.title)}
                                    <span onClick={e => e.stopPropagation()}><SharingModal url={eval(newsCardObj.url)} title={eval(newsCardObj.title)} /></span>
                                </p>
                                {eval(newsCardObj.multimedia) ? <img src={eval(newsCardObj.img)} style={imgStyle}></img> : <img src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" style={imgStyle}></img> }
                                <p style={{ margin: "auto", fontStyle: "italic", fontSize:"14px"}}>
                                {eval(newsCardObj.publishedDate)}<span className='section-search-card' style={sectionColor(eval(newsCardObj.section))}>{eval(newsCardObj.section).toUpperCase()}
                                </span></p>
                                {/* <p><Col xs={9}> {eval(newsCardObj.publishedDate)}</Col>
                                    <Col xs={3} style={{float:"right"}}>{eval(newsCardObj.section)}</Col>
                                    
                                </p> */}
                            </div>
                        </Col>                        
                    ))}
                </Row>   
                </Container> 
                </div>
                
            );
        }
    }
}
export default withRouter(SearchCard);
