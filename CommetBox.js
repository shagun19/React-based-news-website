import React from 'react';
import commentBox from 'commentbox.io';

class PageWithComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: {}
        };
    }

    componentDidMount() {
        console.log(this.props.id);
        //new 5701466861862912-proj
        // old 5696427791482880-proj
        // prod 5650692228251648-proj
        //prod v2 5718254613954560-proj
        this.removeCommentBox = commentBox('5718254613954560-proj', {defaultBoxId: this.props.id});
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {
        return (
            <div className="commentbox" />
        );
    }
}
export default PageWithComments;