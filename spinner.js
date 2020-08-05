import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override ={
    "margin-left":"auto",
    "margin-right":"auto",
    "top":"270px"
}
const override1 = {
    
    "position": "absolute",
    "top": "405px",
    "left": "50%",
    "margin-right": "-50%",
    "transform": "translate(-50%, -50%)"
}

class LoadSpinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            displayMessage: false

        };
        this.enableMessage = this.enableMessage.bind(this);
        this.timer = setTimeout(this.enableMessage, 250);


    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    enableMessage() {
        this.setState({ displayMessage: true });
    }

    render() {
        const { displayMessage } = this.state;
        if (!displayMessage) {
            return null;
        }
        return (
            <>
            <div className="sweet-loading">
                <BounceLoader
                    css={override}
                    size={50}
                    color={"#123abc"}
                    loading={this.state.loading}
                />
                    <h3 style={ override1 }>Loading</h3>
            </div>
            </>
        );
    }
}

export default LoadSpinner;