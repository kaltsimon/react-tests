import * as React from 'react';
import * as Remarkable from 'remarkable';
import * as $ from 'jquery';

export interface CommentProps {
    id?:number;
    author?:string;
    text?:string;
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

    private handleCommentSubmit(comment:CommentProps) {
        console.log('Submitting comment', comment);
        // TODO: Send request to server
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
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
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

export class CommentForm extends React.Component<{onCommentSubmit:(props:CommentProps) => void}, CommentProps> {
    constructor(props:any, context:CommentProps) {
        super(props, context);
        this.state = {
            author: '',
            text: ''
        };
    }

    handleAuthorChange(event:React.FormEvent) {
        this.setState({author: event.target.value});
    }

    handleTextChange(event:React.FormEvent) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event:React.FormEvent) {
        event.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();
        if (!text || !author) {
            return;
        }

        this.props.onCommentSubmit({author, text});

        this.setState({ author: '', text: '' });
    }

    render() {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
                <input type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange.bind(this)}
                />
                <input type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange.bind(this)} />
                <input type="submit" value="Post" />
            </form>
        );
    }
}
