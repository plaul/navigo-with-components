import html from "https://unpkg.com/navigo-utils"

const template = document.createElement('template');
template.innerHTML = html`
<h2>Home</h2>
<p>This will hopefully end up as a cook example for how to do Client Side Rendering with Navigo</p>
`

export default function (element) {

  const clone = template.content.cloneNode(true);
  document.getElementById(element).innerHTML = ""
  document.getElementById(element).appendChild(clone);
}