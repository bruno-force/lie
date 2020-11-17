import app from 'my/app';
import { buildCustomElementConstructor } from 'lwc';

customElements.define('my-app', buildCustomElementConstructor(app));
