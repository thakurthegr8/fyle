class GitHubAPI {
  constructor(username) {
    this.username = username;
  }

  async fetchUser() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${this.username}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
  async fetchRepos(page = 1) {
    try {
      const response = await fetch(
        `https://api.github.com/users/${this.username}/repos?page=${page}&per_page=10`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
}
