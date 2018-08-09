export default function setLinkTarget(html) {
  return html.split('<a ').join('<a target="_blank" ');
}
