async function getArticlesAsync() {
  let response = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@fabio.maienschein"
  );
  let data = await response.json();
  return data;
}

let markupArticles;

getArticlesAsync()
  .then(
    (data) =>
      (markupArticles = `
        ${data.items
          .map(
            (item) => `<article class="col-6 col-12-xsmall work-item">
                                <a href="${item.link}" class="image fit thumb"><img src="${item.thumbnail}" alt="" /></a>
                                <h3>${item.title}</h3>
                                <p>${item.pubDate}</p>
                            </article>`
          )
          .join("")}
    `)
  )
  .then(
    () =>
      (document.querySelector("#writing-content").innerHTML = markupArticles)
  );

async function getProjectsAsync() {
  let response = await fetch("https://api.github.com/users/fabiomai/repos");
  let data = await response.json();
  return data;
}

let markupProjects;

getProjectsAsync()
  .then(
    (data) =>
      (markupProjects = `
          ${data
            .map(
              (item) => `<article class="col-6 col-12-xsmall work-item">
                                  <a href="${item.html_url}" class="image fit thumb"><img src="images/thumbs/01.jpg" alt="" /></a>
                                  <h3>${item.name}</h3>
                                  <p>${item.description}</p>
                              </article>`
            )
            .join("")}
      `)
  )
  .then(
    () =>
      (document.querySelector("#projects-content").innerHTML = markupProjects)
  );
