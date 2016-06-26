/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var Comments_1 = __webpack_require__(3);
	var App;
	(function (App) {
	    var Main = (function () {
	        function Main() {
	            ReactDOM.render(React.createElement(Comments_1.CommentBox, {url: "/data/comments.json", pollInterval: 2000}), document.getElementById('react-app'));
	        }
	        return Main;
	    }());
	    App.Main = Main;
	    function main() {
	        var main = new Main();
	    }
	    App.main = main;
	})(App || (App = {}));
	App.main();


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Remarkable = __webpack_require__(4);
	var $ = __webpack_require__(5);
	var CommentBox = (function (_super) {
	    __extends(CommentBox, _super);
	    function CommentBox(props, context) {
	        _super.call(this, props, context);
	        this.state = { data: [] };
	    }
	    CommentBox.prototype.updateComments = function () {
	        var _this = this;
	        $.ajax({
	            url: this.props.url,
	            dataType: 'json',
	            cache: false,
	            success: function (data) { return _this.setState({ data: data }); },
	            error: function (xhr, status, err) { return console.error(_this.props.url, status, err.toString()); }
	        });
	    };
	    CommentBox.prototype.componentDidMount = function () {
	        this.updateComments();
	        setInterval(this.updateComments.bind(this), this.props.pollInterval);
	    };
	    CommentBox.prototype.render = function () {
	        return (React.createElement("div", {className: "comment-box"}, React.createElement("h1", null, "Comments"), React.createElement(CommentList, {data: this.state.data}), React.createElement(CommentForm, null)));
	    };
	    return CommentBox;
	}(React.Component));
	exports.CommentBox = CommentBox;
	var CommentList = (function (_super) {
	    __extends(CommentList, _super);
	    function CommentList() {
	        _super.apply(this, arguments);
	    }
	    CommentList.prototype.render = function () {
	        var commentNodes = this.props.data.map(function (comment) { return (React.createElement(Comment, {author: comment.author, key: comment.id}, comment.text)); });
	        return (React.createElement("div", {className: "comment-list"}, commentNodes));
	    };
	    return CommentList;
	}(React.Component));
	exports.CommentList = CommentList;
	var Comment = (function (_super) {
	    __extends(Comment, _super);
	    function Comment() {
	        _super.apply(this, arguments);
	    }
	    Comment.prototype.rawMarkup = function () {
	        var md = new Remarkable();
	        var rawMarkup = md.render(this.props.children.toString());
	        return { __html: rawMarkup };
	    };
	    Comment.prototype.render = function () {
	        return (React.createElement("div", {className: "comment"}, React.createElement("h2", {className: "comment-author"}, this.props.author), React.createElement("span", {dangerouslySetInnerHTML: this.rawMarkup()})));
	    };
	    return Comment;
	}(React.Component));
	exports.Comment = Comment;
	var CommentForm = (function (_super) {
	    __extends(CommentForm, _super);
	    function CommentForm() {
	        _super.apply(this, arguments);
	    }
	    CommentForm.prototype.render = function () {
	        return (React.createElement("form", {className: "comment-form"}, React.createElement("input", {type: "text", placeholder: "Your name"}), React.createElement("input", {type: "text", placeholder: "Say something..."}), React.createElement("input", {type: "submit", value: "Post"})));
	    };
	    return CommentForm;
	}(React.Component));
	exports.CommentForm = CommentForm;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Remarkable;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = $;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map