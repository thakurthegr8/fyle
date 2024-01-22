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
  async fetchRepos() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${this.username}/repos`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
}
