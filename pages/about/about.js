import html from "https://unpkg.com/navigo-utils"

const template = document.createElement('template');
template.innerHTML = html`
<h2>About</h2>
<p>......................</p>
`

export default function (element) {

const clone = template.content.cloneNode(true);
document.getElementById(element).innerHTML = ""
document.getElementById(element).appendChild(clone);
}