import * as React from 'react';
import * as Remarkable from 'remarkable';
import * as $ from 'jquery';

export interface CommentProps {
    id:number;
    author:string;
    text:string;
}

interface CommentData {
    data:CommentProps[];
}

interface CommentPropsInternal {
    author:string;
    key:number;
}

interface API {
    url:string;
    pollInterval:number;
}

export class CommentBox extends React.Component<API, CommentData> {
    constructor(props:API, context:CommentData) {
        super(props, context);
        this.state = {data:[]};
    }

    private updateComments() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => this.setState({data: data}),
            error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
        });
    }

    componentDidMount() {
        this.updateComments();
        setInterval(this.updateComments.bind(this), this.props.pollInterval);
    }


    render() {
        return (
            <div className="comment-box">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
}

export class CommentList extends React.Component<CommentData, {}> {
    render() {
        let commentNodes = this.props.data.map((comment:CommentProps) => (
            <Comment author={comment.author} key={comment.id}>
                {comment.text}
            </Comment>
        ));
        return (
            <div className="comment-list">
                {commentNodes}
            </div>
        );
    }
}

export class Comment extends React.Component<CommentPropsInternal, {}> {
    rawMarkup() {
        let md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div className="comment">
                <h2 className="comment-author">{this.props.author}</h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
}

export class CommentForm extends React.Component<{}, {}> {
    render() {
        return (
            <div className="comment-form">
            </div>
        );
    }
}
