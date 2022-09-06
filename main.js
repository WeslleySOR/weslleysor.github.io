const urls = [
  "https://api.github.com/repos/WeslleySOR/front-end-challenge",
  "https://api.github.com/repos/WeslleySOR/mks-frontend-challenge",
  "https://api.github.com/repos/WeslleySOR/NLWTogether-letmeask",
  "https://api.github.com/repos/WeslleySOR/ignews",
  "https://api.github.com/repos/WeslleySOR/dt-money-deploy",
  "https://api.github.com/repos/WeslleySOR/naruto-book",
];

Promise.all(urls.map((u) => fetch(u))).then(async (responses) => {
  responses.map(async (response) => {
    const data = await response.json();
    const branchCounter = await fetch(
      `https://api.github.com/repos/${data.owner.login}/${data.name}/branches?per_page=100&page=1`
    ).then(async (res) => {
      const resData = await res.json();
      return resData.length;
    });

    var projectsFather = document.getElementById("profile-my-projects-main");

    var projectCard = document.createElement("div");
    projectCard.setAttribute("class", "project card-shadowed");
    projectsFather.appendChild(projectCard);

    var projectHeader = document.createElement("div");
    projectHeader.setAttribute("class", "project-header");
    var projectMain = document.createElement("div");
    projectMain.setAttribute("class", "project-main");
    var projectFooter = document.createElement("div");
    projectFooter.setAttribute("class", "project-footer");
    projectCard.appendChild(projectHeader);
    projectCard.appendChild(projectMain);
    projectCard.appendChild(projectFooter);

    var projectHeaderFolderIcon = document.createElement("img");
    projectHeaderFolderIcon.setAttribute("src", "./assets/folder.svg");
    projectHeaderFolderIcon.setAttribute("alt", "");
    var projectHeaderTitle = document.createElement("a");
    projectHeaderTitle.setAttribute("href", data.html_url);
    projectHeaderTitle.setAttribute("target", "_blank");
    projectHeaderTitle.setAttribute(
      "aria-label",
      "Link para navegar até a página do repositório do projeto."
    );
    projectHeaderTitle.setAttribute("class", "repo-link");
    projectHeaderTitle.innerHTML = data.name;
    if (data.homepage !== "") {
      var projectHeaderDeployLink = document.createElement("a");
      projectHeaderDeployLink.setAttribute("href", data.homepage);
      projectHeaderDeployLink.setAttribute("target", "_blank");
      projectHeaderDeployLink.setAttribute(
        "aria-label",
        "Link para navegar até a pagina do projeto."
      );
      projectHeaderDeployLink.setAttribute("class", "deploy-link");
      var projectHeaderDeployLinkIcon = document.createElement("img");
      projectHeaderDeployLinkIcon.setAttribute("src", "./assets/link.svg");
      projectHeaderDeployLinkIcon.setAttribute(
        "alt",
        "Icone de navegação à links externos."
      );
      projectHeaderDeployLink.appendChild(projectHeaderDeployLinkIcon);
    }
    projectHeader.appendChild(projectHeaderFolderIcon);
    projectHeader.appendChild(projectHeaderTitle);
    if (data.homepage !== "")
      projectHeader.appendChild(projectHeaderDeployLink);

    var projectMainDescription = document.createElement("span");
    projectMainDescription.innerHTML = data.description;
    projectMain.appendChild(projectMainDescription);

    var projectFooterStats = document.createElement("div");
    projectFooterStats.setAttribute("class", "project-footer-stats");
    var projectFooterLanguage = document.createElement("div");
    projectFooterLanguage.setAttribute("class", "project-footer-language");
    projectFooter.appendChild(projectFooterStats);
    projectFooter.appendChild(projectFooterLanguage);

    var projectFooterStatsStar = document.createElement("div");
    projectFooterStatsStar.setAttribute("class", "project-stats");
    var projectFooterStatsStarIcon = document.createElement("img");
    projectFooterStatsStarIcon.setAttribute("src", "./assets/star.svg");
    projectFooterStatsStarIcon.setAttribute("alt", "");
    var projectFooterStatsStarText = document.createElement("span");
    projectFooterStatsStarText.setAttribute(
      "aria-label",
      "Quantidade de estrelas que o projeto tem."
    );
    projectFooterStatsStarText.innerHTML = data.stargazers_count;
    projectFooterStatsStar.appendChild(projectFooterStatsStarIcon);
    projectFooterStatsStar.appendChild(projectFooterStatsStarText);

    var projectFooterStatsBranch = document.createElement("div");
    projectFooterStatsBranch.setAttribute("class", "project-stats");
    var projectFooterStatsBranchIcon = document.createElement("img");
    projectFooterStatsBranchIcon.setAttribute("src", "./assets/git-branch.svg");
    projectFooterStatsBranchIcon.setAttribute("alt", "");
    var projectFooterStatsBranchText = document.createElement("span");
    projectFooterStatsBranchText.setAttribute(
      "aria-label",
      "Quantidade de branchs que o projeto tem."
    );
    projectFooterStatsBranchText.innerHTML = branchCounter;
    projectFooterStatsBranch.appendChild(projectFooterStatsBranchIcon);
    projectFooterStatsBranch.appendChild(projectFooterStatsBranchText);

    projectFooterStats.appendChild(projectFooterStatsStar);
    projectFooterStats.appendChild(projectFooterStatsBranch);

    var projectFooterLanguageElipse = document.createElement("div");
    projectFooterLanguageElipse.setAttribute("class", "elipse");
    var projectFooterLanguageText = document.createElement("span");
    projectFooterLanguageText.setAttribute("aria-label", "Linguagem mais utilizada no projeto.");
    projectFooterLanguageText.innerHTML = data.language;

    projectFooterLanguage.appendChild(projectFooterLanguageElipse);
    projectFooterLanguage.appendChild(projectFooterLanguageText);
  });
});
