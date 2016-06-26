import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CommentBox, CommentProps } from './components/Comments';

namespace App {
    export class Main {
        constructor() {
            ReactDOM.render(
                <CommentBox url="/data/comments.json" />,
                document.getElementById('react-app')
            );
        }
    }

    export function main() {
        let main = new Main();
    }
}

App.main();
