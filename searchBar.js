import React, { Component } from 'react';
import _ from "lodash";
import AsyncSelect from 'react-select/async';
import ReactDOM from 'react-dom';
import SearchCard from './SearchCards';
import { Link, BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";


 
class WithPromises extends Component {

    state = {
        redirect: true,
        queryString: ""
    }

    displaySearchResult = query =>{
        
        if(query!==null){
            this.props.handler(query.label);
            console.log(this.props.source + " " + query.label);
            var searchPath = "/search?q=" + query.label;
            this.props.history.push(searchPath);
            this.setState({queryString:query});
        }   
    }

     promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(this.getOptions(inputValue));
            }, 1000);
        });

     testOptions = (options) => {
        var i;
        var autosuggestOptions = [];
        for (i = 0; i < options.length; i++) {
            var temp = { value: options[i].query, label: options[i].query };
            autosuggestOptions.push(temp);
        }
        return autosuggestOptions;
    }

    async getOptions(inputValue) {
        var url = 'https://webtech-autosuggest-v2.cognitiveservices.azure.com/bing/v7.0/suggestions?q=' + inputValue;
        var options = await fetch(url, {
            headers: { 'Ocp-Apim-Subscription-Key': 'd60658ee24b9447f80fbc114ee129003', 'Retry-After': 30, 'User-agent': 'your bot 0.1' }
        }).then(res => res.json()).then((data) => {
            return this.testOptions(data.suggestionGroups[0].searchSuggestions);
        });
        return options;
    }

    render() {
        const { redirect } = this.state;
        console.log(redirect);
        return(
            <>
                
            {/* <AsyncSelect isClearable={true} loadOptions={_.throttle(this.promiseOptions, 3000)} onChange={this.displaySearchResult}  defaultOptions={this.props.defaultOptions} placeholder="Enter keyword .."/> */}
                <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}><AsyncSelect isClearable={false} loadOptions={_.debounce(this.promiseOptions, 1000)} onChange={this.displaySearchResult} placeholder="Enter keyword .." /></span>
            </>
            )
            
        }
}

export default withRouter(WithPromises);