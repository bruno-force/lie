import { LightningElement, track } from 'lwc';

const NAV_SELECTOR = 'my-navigation';

export default class App extends LightningElement {
    @track ready = false;

    renderedCallback() {
        if (!this.ready) {
            if (this.navigation) {
                // TODO: I DON'T THINK IT WORKS
                this.navigation.focus();
                this.ready = true;
            }
        }
    }

    handleKeyPress({ code }) {
        console.log('KEY PRESS', code);
        this.navigation.keyPressed(code);
    }

    get navigation() {
        return this.template.querySelector(NAV_SELECTOR);
    }
}
