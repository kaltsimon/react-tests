import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CommentBox, CommentProps } from './components/Comments';

namespace App {
    export class Main {
        private data:CommentProps[] = [
            {id: 1, author: "Pete Hunt", text: "This is a _comment_."},
            {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
        ];

        constructor() {
            ReactDOM.render(
                <CommentBox data={this.data} />,
                document.getElementById('react-app')
            );
        }
    }

    export function main() {
        let main = new Main();
    }
}

App.main();
