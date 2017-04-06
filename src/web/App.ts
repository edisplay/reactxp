/**
* App.tsx
* Copyright: Microsoft 2017
*
* Implements App interface for ReactXP.
*/

import React = require('react');
import ReactDOM = require('react-dom');

import { RootView } from './RootView';
import RX = require('../common/Interfaces');
import Types = require('../common/Types');

// Hack to allow inline-require without importing node.d.ts
declare var require: (path: string) => any;
if (typeof(document) !== 'undefined') {
    var ifvisible = require('ifvisible.js');
}

export class App extends RX.App {
    private _activationState: Types.AppActivationState;

    constructor() {
        super();

        // Handle test environment where document is not defined.
        if (typeof(document) !== 'undefined') {
            this._activationState = ifvisible.now() ? Types.AppActivationState.Active : Types.AppActivationState.Background;

            ifvisible.on('focus', () => {
                if (this._activationState !== Types.AppActivationState.Active) {
                    this._activationState = Types.AppActivationState.Active;
                    this.activationStateChangedEvent.fire(this._activationState);
                }
            });

            ifvisible.on('blur', () => {
                if (this._activationState !== Types.AppActivationState.Background) {
                    this._activationState = Types.AppActivationState.Background;
                    this.activationStateChangedEvent.fire(this._activationState);
                }
            });
        }
    }

    initialize(debug: boolean, development: boolean) {
        super.initialize(debug, development);
        window['rxdebug'] = debug;
    }

    getActivationState(): Types.AppActivationState {
        return this._activationState;
    }
}

export default new App();
