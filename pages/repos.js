const router = new Router();
const root = document.querySelector("#root");
const REPOS_PER_PAGE = 10;

const getUser = async (github) => {
  const user = await github.fetchUser();
  if (!user) {
    router.route("/index");
  }
  return user;
};

const getRepos = async (github) => {
  const repos = await github.fetchRepos();
  if (!repos) {
    router.route("/index");
  }
  return repos;
};

const assignUserInfoToDOM = (user) => {
  const userInfoTemplate = document.querySelector("#user_info");
  const userInfo = document.importNode(userInfoTemplate.content, true);
  console.log(user);
  const avatar = userInfo.querySelector("img");
  avatar.src = user.avatar_url;
  const title = userInfo.querySelector("h1");
  title.textContent = user.name;
  const bio = userInfo.querySelector("p");
  bio.textContent = user.bio;
  root.appendChild(userInfo);
};

const assignReposInfoToDOM = (repos) => {
  if (repos.length === 0) {
    return;
  }
  const reposInfoLayoutTemplate = document.querySelector("#repo_info_layout");
  const reposInfoLayout = document.importNode(
    reposInfoLayoutTemplate.content,
    true
  );
  const reposInfoLayoutInner =
    reposInfoLayout.querySelector(".repo_info_layout");
  const repoInfoTemplate = document.querySelector("#repo_info");
  repos.forEach((repo) => {
    const repoInfo = document.importNode(repoInfoTemplate.content, true);
    const title = repoInfo.querySelector("h2");
    title.textContent = repo.name;
    const description = repoInfo.querySelector("p");
    description.textContent = repo.description;
    const language = repoInfo.querySelector("span");
    language.textContent = repo.language;
    reposInfoLayoutInner.appendChild(repoInfo);
  });
  root.appendChild(reposInfoLayoutInner);
};
const assignPaginationToDOM = (repoCount, username) => {
  const totalPages =
    repoCount / REPOS_PER_PAGE + (repoCount % REPOS_PER_PAGE === 0 ? 0 : 1);
  const paginationLayoutTemplate = document.querySelector(
    "#repo_pagination_layout"
  );
  const paginationLayoutImported = document.importNode(
    paginationLayoutTemplate.content,
    true
  );
  const paginationLayout = paginationLayoutImported.querySelector(
    ".repo_pagination_layout"
  );
  for (let i = 1; i <= totalPages; i++) {
    const paginationTabTemplate = document.querySelector(
      "#repo_pagination_tab"
    );
    const paginationImported = document.importNode(
      paginationTabTemplate.content,
      true
    );
    const paginationLink = paginationImported.querySelector("a");
    paginationLink.textContent = i;
    paginationLink.href = `?username=${username}&page=${i}`;
    paginationLayout.appendChild(paginationLink);
  }
  console.log(paginationLayout);
  root.appendChild(paginationLayout);
};

const main = async () => {
  const params = router.params();

  if (!params["username"]) {
    router.route("/index");
    return;
  }
  const { username, page } = params;
  const github = new GitHubAPI(username);
  const user = await getUser(github);
  assignUserInfoToDOM(user);
  const repos = await github.fetchRepos(!page ? 1 : page);
  assignReposInfoToDOM(repos);
  assignPaginationToDOM(user.public_repos, user.login);
};

main();
