import { Inject, Injectable } from "@angular/core";
import { DOCUMENT, __platform_browser_private__ } from "@angular/platform-browser";

import { isNode } from "angular2-universal";

@Injectable()
export class ScriptsService {
    constructor(@Inject(DOCUMENT) protected document: any) {}

    private _dom = __platform_browser_private__.getDOM();

    updateInlineTag(code: string): void {
        let el = this._dom.createElement("script", this.document);

        this._dom.setInnerHTML(el, code);
        this._dom.appendChild(this.document.body, el);
    }

    updateExternalTag(src: string, onload?: () => any): HTMLScriptElement {
        let tag: HTMLScriptElement = this.getExternalTag(src) || this._addInternal(src);

        if (onload) {
            // I've tried these ways so far

            // this._dom.setAttribute(tag, "onload", onload.toString());
            // tag.onload = onload;
            // tag.onload = onload.toString();
        }

        return tag;
    }

    getExternalTag(src: string): any {
        if (!src) {
            return null;
        }

        // doing this until I discover why querySelector always returns undefined on serverside
        if (isNode) {
            let tags = this._dom.querySelectorAll(this.document.body, "script");
            return tags.filter((tag: any) => tag.attribs.src === src).pop();
        }

        return this._dom.querySelector(this.document.body, `script[src="${src}"]`);
    }

    private _addInternal(src: string): HTMLScriptElement {
        let el = this._dom.createScriptTag("src", src);

        this._dom.setAttribute(el, "defer", "");
        this._dom.appendChild(this.document.body, el);

        return el as HTMLScriptElement;
    }
}
