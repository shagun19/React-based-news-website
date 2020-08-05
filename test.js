import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import SharingModal from './sharing-modal';
import DetailedArticle from './DetailedArticle';
import {Router, withRouter, Link, Route} from 'react-router-dom';
import LoadSpinner from './spinner';


class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            checked: "",
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateKey = this.updateKey.bind(this);
        

    }

   
    handleClick = param => e => {
        e.preventDefault();
        this.setState({ checked: param });
        this.props.handler(param);
        document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
        document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
        document.getElementById("switch-toggle").setAttribute("class", "display-none");


        var searchPath = "/article?id=" + param;
        this.props.history.push(searchPath);
    
    }

    updateKey(){
        if(this.props.queryString!==null) this.props.handlerQueryParam(null);
    }

    // addDelay(){
    //     setTimeout(function(){ return (<LoadSpinner />)},500);
            
    // }

    
    // componentWillUnmount(){
    //     this.props.handlerQueryParam();
    // }


    componentDidMount() {

       
        if (document.getElementsByClassName("display-none")[0]!=null){
            document.getElementsByClassName("display-none")[0].setAttribute("class", "news-type");
            document.getElementsByClassName("display-none")[1].setAttribute("class", "news-type");
            document.getElementById("switch-toggle").setAttribute("class", "display-inline");
        }
        
        console.log("Check " + this.props.source + " " + this.props.category);
        function validateData(result){
            var validated = []
            var total = 0;
            var i;
            for(i=0;i<result.length;i++){
                if (result[i].blocks.main !== undefined) {
                    validated.push(result[i])
                    total++;
                    if(total===10) break;
                }
            }
            return validated;
        }
        var url;
        var domain = "https://newsapp-backend-api.ue.r.appspot.com/";
        if (this.props.source === "NYTimes") url = domain+"nytimes";
        else url = domain+"guardian";
        if (this.props.category === "sports" && this.props.source === "Guardian") url = url+ "/sport" ;
        else if (this.props.category!=="" && this.props.category!=="home") url=url+"/"+this.props.category;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (this.props.source === "NYTimes"){
                        this.setState({
                            isLoaded: true,
                            items: result.results.slice(0, 10)

                        });
                    }
                    else{
                        this.setState({
                            isLoaded: true,
                            items: validateData(result.response.results)
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            ).catch("Error");
    }

    render() {
        if (document.getElementsByClassName(" css-1uccc91-singleValue")[0]!=null){
            document.getElementsByClassName(" css-1uccc91-singleValue")[0].innerHTML ="Enter keyword ..";
            document.getElementsByClassName(" css-1uccc91-singleValue")[0].setAttribute("style", "color: grey;");
        }
       
         if(document.getElementById("bk-fill")!=null){
            document.getElementById("bk-fill").setAttribute("class", "display-none1");
            document.getElementById("bk-outline").setAttribute("class", "bookmark");
        }
        
        function sectionColor(sectionColor) {
            var section = sectionColor.toLowerCase();
            if (section === "world") {
                return { "backgroundColor": "purple", "color":"white"};   
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
            else{
                return { "backgroundColor": "gray", "color": "black" };
            }
        }

        function findWideImage(imageObj){
            var i;
            var url = "";
            for (i = 0; i < imageObj.length; i++){
                if (imageObj[i].width >= 2000) {
                    url=imageObj[i].url;
                    break;
                }
            }
            if (url === "") url = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            return url;
        }

        function findValidAssetGuardian(imageObj) {
            if (imageObj.length!==0) return true;
            else return false;
        }

        const { error, isLoaded, items } = this.state;
        const style1 = {
            "marginLeft": "20px !important",
            "marginRight": "20px !important",
        }
        const test = {
            "maxWidth": "100%",
            "padding": "1%",
            "border": "1px solid #dee0e3",
            "borderRadius": "4px",
        }
        const div ={
            "margin": "15px",
            "cursor": "pointer"
        }

        const div1 = {
            "marginTop": "25px"
        }

        const testStyle = {
            "fontStyle": "italic",
            "fontWeight": "bold",
            "fontSize": "18px",
            "marginBottom": "5px"
        } 
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <LoadSpinner/>
        } else {
            var newsCardObj = {};
            if(this.props.source==="NYTimes"){
                newsCardObj.multimedia = "item.multimedia";
                newsCardObj.title="item.title";
                newsCardObj.abstract ="item.abstract";
                newsCardObj.publishedDate = "item.published_date.slice(0, 10)";
                newsCardObj.section ="item.section";
                newsCardObj.img = "findWideImage(item.multimedia)";
                newsCardObj.url = "item.url";
                newsCardObj.id = "item.url";
            }
            else if (this.props.source === "Guardian"){
                newsCardObj.multimedia = "findValidAssetGuardian(item.blocks.main.elements[0].assets)";
                newsCardObj.title = "item.webTitle";
                newsCardObj.abstract = "item.blocks.body[0].bodyTextSummary";
                newsCardObj.publishedDate = "item.webPublicationDate.slice(0, 10)";
                newsCardObj.section = "item.sectionName";
                newsCardObj.img = "item.blocks.main.elements[0].assets[item.blocks.main.elements[0].assets.length-1].file";
                newsCardObj.url = "item.webUrl";
                newsCardObj.id = "item.id";
            }
            return (
                <>
                <ul className="li-without-bullets" id="news-cards-id">
                    {items.map(item => (
                        <Container className="news-card" fluid="xs" onClick={this.handleClick(eval(newsCardObj.id))}>
                        {/* <Link to="/detail"><Container className="news-card" fluid="xs" onClick={this.handleClick(eval(newsCardObj.id))}> */}
                            <div style={div}>
                                <Row>
                                    <Col xs={12} md={3}> {/* Image  */}
                                        {eval(newsCardObj.multimedia) ? <img style={test} class="image-responsive" src={eval(newsCardObj.img)}></img> : <img style={test} class="image-responsive" src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"/>}  
                                    </Col>
                                    <Col xs={11} md={9} style={style1}> {/* Textual data */}
                                    <div style={{paddingLeft:"15px", paddingRight:"10px"}}>
                                        <Row>
                                            <p style={testStyle}>{eval(newsCardObj.title)}
                                                <span onClick={e => e.stopPropagation()}><SharingModal url={eval(newsCardObj.url)} title={eval(newsCardObj.title)} /></span>
                                            </p>
                                        </Row>
                                        <Row><p className="block-with-text">{eval(newsCardObj.abstract)}</p></Row>
                                        <Row style={div1}>
                                            <Col className="published-date">{eval(newsCardObj.publishedDate)}<div className="news-section" style={sectionColor(eval(newsCardObj.section))}>{eval(newsCardObj.section).toUpperCase()}</div></Col>
                                        </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    ))}
                </ul>
                       
                </>
            );
        }
    }
}
export default withRouter(MyComponent);
