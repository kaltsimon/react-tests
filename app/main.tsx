import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';

namespace App {
    export class Main {
        constructor() {
            ReactDOM.render(
                <Hello compiler="Typescript" framework="React" />,
                document.getElementById('react-app')
            );
        }
    }

    export function main() {
        let main = new Main();
    }
}

App.main();
