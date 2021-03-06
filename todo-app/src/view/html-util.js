export function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// HTML文字列をDOM Nodeに変換
export function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}


// ナイーブな文字列 -> エスケープされた文字列 -> DOM Node
export function element(strings, ...values) {
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value == "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
  return htmlToElement(htmlString);
}

// コンテナ要素の中身をbodyElementで上書きする
export function render(bodyElement, containerElement) {
  containerElement.innerHTML = "";
  containerElement.appendChild(bodyElement);
}
