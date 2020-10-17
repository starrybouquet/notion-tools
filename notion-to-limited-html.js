// ==UserScript==
// @name            notion-limited-html-export
// @namespace       ???
// @match           https://www.notion.so/*
// @version         0.0.1
// @description     Render Notion text as HTML export
// ==/UserScript==

// add convert button
let moreButton = document.getElementsByClassName('notion-topbar-more-button')[0];
let convertButton = document.createElement('div');
convertButton.textContent = 'Limited HTML';
convertButton.setAttribute('style', 'element {
    user-select: none;
    transition: background 20ms ease-in 0s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    white-space: nowrap;
    height: 28px;
    border-radius: 3px;
    font-size: 14px;
    line-height: 1.2;
    min-width: 0px;
    padding-left: 8px;
    padding-right: 8px;
    color: rgb(55, 53, 47);');
convertButton.onclick = convertToLimitedHTML;
moreButton.before(convertButton);

let htmlElements = [];

function convertToLimitedHTML(e) {
    var pageContent = document.getElementsByClassName('notion-page-content')[0];
    var pageChildren = pageContent.children;
    for (var i = 0; i < pageChildren.length; i++) {
        var block = pageChildren[i];
        if (block.getElementsByTagName('span').length > 0) {
            for (var i=0; i<block.getElementsByTagName('span').length, i++) {
                styleSpan = block.getElementsByTagName('span')[i];
                if (styleSpan.style['font-style'] == 'italic') {
                    var italics = document.createElement('i');
                    italics.textContent = styleSpan.textContent; // need to check if this is a shallow copy so it stays when we delete styleSpan
                    styleSpan.before(italics);
                } else if (styleSpan['font-weight'] == 600) {
                    var bolded = document.createElement('strong')
                    bolded.textContent = styleSpan.textContent;
                    styleSpan.before(bolded);
                } else if (styleSpan['border-bottom'] == '0.05em') {
                    var underlined = document.createElement('span');
                    underlined.style['text-decoration'] = 'underline';
                    underlined.textContent = styleSpan.textContent;
                    styleSpan.before(underlined);
                }
                styleSpan.remove();
            }
            var text = block.getElementsByClassName('notranslate')[0].innerHTML;
        } else {
            var text = block.getElementsByClassName('notranslate')[0].textContent;
        }
        if (block.classList.includes('notion-text-block') == true) {
            // if it's a normal text block

            htmlElements.push('<p>' + text + '</p>');
        } else if (block.classList.includes('notion-header-block') == true) {
            // if it's a header block
            htmlElements.push('<h3>' + text + '</h3>');
        } else if (block.classList.includes('notion-divider-block') == true) {
            htmlElements.push('<hr/>')
        }

        if (block.classList.includes('notion-text-block') == true) {
            // if it's a normal text block

            htmlElements.push('<p>' + text + '</p>');
        } else if (block.classList.includes('notion-header-block') == true) {
            // if it's a header block
            htmlElements.push('<h3>' + text + '</h3>');
        } else if (block.classList.includes('notion-divider-block') == true) {
            htmlElements.push('<hr/>')
        } else if (block.classList.includes('notion-page-block') == true){
            var link =
            htmlElements.push()
        }
    }
    // add html box
    var limitedHTML = htmlElements.join('');
    // NOW SHOW HTML SOMEWHEREEEEE
}
