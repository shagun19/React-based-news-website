import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, TwitterIcon, FacebookIcon, EmailIcon } from 'react-share';
import CommentBox from './CommetBox';
import Toast from './toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactTooltip from 'react-tooltip';
import LoadSpinner from './spinner';
import smoothscroll from 'smoothscroll-polyfill';


class DetailedArticle extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            error: null,
            isLoaded: false,
            item: {},
            bookmark: false,
            source : ""
        };
        this.bookmarkArticle = this.bookmarkArticle.bind(this);
        this.removeArticle = this.removeArticle.bind(this);
    }

    
   

    componentDidMount() {
        var domain = "https://newsapp-backend-api.ue.r.appspot.com/";
        var source = this.props.source;
        var obtainedQueryString = window.location.href.split("=")[1];
        if (document.getElementById("bk-fill") != null) {
            document.getElementById("bk-fill").setAttribute("class", "display-none1");
            document.getElementById("bk-outline").setAttribute("class", "bookmark");
        }
        if (document.getElementsByClassName("news-type")[0]!=null){
            if (obtainedQueryString.includes("www.nytimes.com")) source="NYTimes";
            else source = "Guardian";
            document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
            document.getElementsByClassName("news-type")[0].setAttribute("class", "display-none");
            document.getElementById("switch-toggle").setAttribute("class", "display-none");
        }
        this.setState({source:source});
        var url;
        if (source === "NYTimes") url = domain+"nytimes-article/";
        else url = domain+"guardian-article/";
        var articleObtainedId ;
        if(this.props.articleId!=="") {
            url = url + this.props.articleId;
            articleObtainedId = this.props.articleId;
        }
        else {
            url = url + obtainedQueryString;
            articleObtainedId = obtainedQueryString;
        }
        if (localStorage.getItem(articleObtainedId) !== null) {
            this.setState({ bookmark: true });
        }
        else {
            this.setState({ bookmark: false });
        }

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (source === "NYTimes") {
                        this.setState({
                            isLoaded: true,
                            item: result.response.docs[0]

                        });
                    }
                    else {
                        this.setState({
                            isLoaded: true,
                            item: result.response.content
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
    
    expand() {
        var desc = document.getElementById("description");
        desc.removeAttribute("class", "block-with-text1");
        document.getElementById("arrow-down").setAttribute("class","display-none");
        document.getElementById("arrow-up").setAttribute("class", "arrow up");
        document.querySelector('.arrow.up').scrollIntoView({ behavior: 'smooth' });
    }

    collapse() {
        var desc = document.getElementById("description");
        desc.setAttribute("class", "block-with-text1");
        document.getElementById("arrow-down").setAttribute("class", "arrow down");
        document.getElementById("arrow-up").setAttribute("class", "display-none");
        document.querySelector('.search-bar').scrollIntoView({ behavior: 'smooth' });
    }

    bookmarkArticle(id, title, url, img, pub_date, section){
        toast("Saving " + title, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
        var newsCardObj = {id:id , title: title, url: url, img: img, pub_date: pub_date, section: section, source: this.state.source}
        localStorage.setItem(id, JSON.stringify(newsCardObj));
        this.setState({bookmark: true});
    }

    removeArticle(message, id) {
        toast("Removing " + message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
        localStorage.removeItem(id);
        this.setState({ bookmark: false });
    }

   

    render() {
        if (document.getElementsByClassName(" css-1uccc91-singleValue")[0] != null) {
            document.getElementsByClassName(" css-1uccc91-singleValue")[0].innerHTML = "Enter Keyword ..";
            document.getElementsByClassName(" css-1uccc91-singleValue")[0].setAttribute("style", "color: grey;");
        }
       
        console.log(this.props.source + " " + this.props.articleId+" "+this.state.bookmark);
        
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
        const { error, isLoaded, item } = this.state;
        const divOuter = {
            "margin": "15px",
            "padding": "15px",
            "position": "relative",
            "border": "1px solid #bbbfbc",
            "border-radius": "4px",
            "box-shadow": "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

        }
        const commentBox = {
            "margin": "10px",
            "padding": "5px",
            "position": "relative"
        }
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <LoadSpinner/>

        } else {
            var newsCardObj = {};
            if (this.state.source === "NYTimes") {
                newsCardObj.multimedia = "item.multimedia";
                newsCardObj.title = "item.headline.main";
                newsCardObj.abstract = "item.abstract";
                newsCardObj.publishedDate = "item.pub_date.slice(0, 10)";
                newsCardObj.section = "item.section_name";
                newsCardObj.img = "findWideImage(item.multimedia)";
                newsCardObj.url = "item.web_url";
                newsCardObj.id = "item.web_url";
            }
            else if (this.state.source === "Guardian") {
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
                <div style={divOuter}>

                        <h1 style={{ fontStyle: "italic"}}>{eval(newsCardObj.title)}</h1>
                    <Row>
                            <Col style={{ marginTop: "6px", fontStyle: "italic", marginLeft: "2px"}}>
                            {eval(newsCardObj.publishedDate)}
                        </Col>
                        <div style={{ position: "relative", marginLeft: "auto", width: "200px", marginBottom: "10px" }}>
                            <Row style={{ marginBottom: "3px" }}>
                                <Col xs={1} style={{ marginRight: "5px" }}>
                                    <FacebookShareButton data-tip="Facebook" data-for="Facebook"
                                        className="share-button1"
                                        url={eval(newsCardObj.url)}
                                        quote="#CSCI_571_NewsApp">
                                        <FacebookIcon size={35} round />
                                        <ReactTooltip id="Facebook" place="top" type="dark" effect="solid" />
                                    </FacebookShareButton>
                                </Col>
                                <Col xs={1} style={{ marginRight: "5px" }}>
                                    <TwitterShareButton data-tip="Twitter" data-for="Twitter"
                                        className="share-button1"
                                        url={eval(newsCardObj.url)}
                                        title="#CSCI_571_NewsApp">
                                        <TwitterIcon size={35} round />
                                        <ReactTooltip id="Twitter" place="top" type="dark" effect="solid" />
                                    </TwitterShareButton>
                                </Col>
                                <Col xs={1} style={{ marginRight: "5px" }}>
                                    <EmailShareButton data-tip="Email" data-for="Email"
                                        className="share-button1"
                                        url={eval(newsCardObj.url)}
                                        subject="#CSCI_571_NewsApp">
                                        <EmailIcon size={35} round />
                                        <ReactTooltip id="Email" place="top" type="dark" effect="solid" />
                                    </EmailShareButton>
                                </Col>
                                    {!this.state.bookmark ? 
                                    <Col xs={1} style={{ marginLeft: "45px" }}>
                                        <FaRegBookmark className="bookmark-detail-page" onClick={() => {
                                            this.bookmarkArticle(eval(newsCardObj.id),
                                                                eval(newsCardObj.title),
                                                                eval(newsCardObj.url),
                                                                eval(newsCardObj.img),
                                                                eval(newsCardObj.publishedDate),
                                                                eval(newsCardObj.section))
                                            }} data-tip="Bookmark" data-for="bookmark-red"/>
                                            

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
                                            <ReactTooltip id="bookmark-red" place="top" type="dark" effect="solid" />
                                    </Col> : <Col xs={1} style={{ marginLeft: "45px" }}>
                                            <FaBookmark className="bookmark-detail-page" onClick={() => { this.removeArticle(eval(newsCardObj.title), eval(newsCardObj.id)) }} data-tip="Bookmark" data-for="bookmark-red"/>
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
                                        </Col>}
                                    {/*  */}
                                    
                            </Row>
                        </div>

                    </Row>

                        {eval(newsCardObj.multimedia) ? <img src={eval(newsCardObj.img)} style={{ width: "100%" }}></img> : <img src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" style={{ width: "100%" }}></img>}
                    <p class="block-with-text1" id="description" style={{textAlign: "justify"}}>{eval(newsCardObj.abstract)}</p>
                        <div style={{ width: "20px", marginLeft: "auto" }}><p id="arrow-down" className="arrow down" onClick={this.expand}></p></div>
                        <div style={{ width: "20px", marginLeft: "auto" }} ><p id="arrow-up" className="arrow up display-none" onClick={this.collapse} ref={this.myRef}></p></div>
                </div>
                <div style={commentBox}><CommentBox id={eval(newsCardObj.id)}></CommentBox></div>
                </>
            )
        }
        
    }
}
export default DetailedArticle;
