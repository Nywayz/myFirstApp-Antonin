const divManga = `
<div class="col-12 col-md-4">
    <a href="__link__" target="_blank">
    <div class="card">
    <img src="__src__" class="card-img-top" />
    <div class="card-body">
        <h5 class="card-title">__top__. __title__</h5>
            __description__
        </p>
    </div>
    </div>
    </a>
</div>
`;

const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const fetchApiDone = (json) => {
  const divList = document.getElementById("list");
  json.forEach((manga, i) => {
    const newDivManga = divManga
      .replace("__link__", manga.link)
      .replace("__src__", manga.img)
      .replace("__top__", i + 1)
      .replace("__title__", manga.name)
      .replace("__description__", manga.description);
    divList.appendChild(htmlToElement(newDivManga));
  });
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("api/mangas.json").then((response) =>
    response.json().then(fetchApiDone)
  );
});
