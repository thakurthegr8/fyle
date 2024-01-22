const router = new Router();
const root = document.querySelector("#root");

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
  const reposInfoLayoutInner = reposInfoLayout.querySelector(".grid");
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

const main = async () => {
  const params = router.params();

  if (!params["username"]) {
    router.route("/index");
    return;
  }
  const { username } = params;
  const github = new GitHubAPI(username);
  const user = await getUser(github);
  assignUserInfoToDOM(user);
  const repos = await github.fetchRepos(github);
  assignReposInfoToDOM(repos);
};

main();
