// Fetch Data from GitHub Api

const CLIENT_ID = 'fa8153bd1525408c5de4',
  CLIENT_SECRET = '7be5f7027e2c9e3dd5726ae379a97167ecd7de56',
  SORTED_BY = 'created:desc',
  REPO_COUNT = 5;

class GitHub {
  async getUsers(username) {
    // GET USERS
    const profileResp = await fetch(
      `https://api.github.com/users/${username}?client_id=${CLIENT_ID}&clint_secret=${CLIENT_SECRET}`
    );
    const profile = await profileResp.json();

    if (profile.message || profileResp.status === 404) {
      return { profile, repos: [] };
    }

    // GET REPOS
    const repoResp = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${REPO_COUNT}&sort=${SORTED_BY}&client_id=${CLIENT_ID}&clint_secret=${CLIENT_SECRET}`
    );
    const repos = await repoResp.json();

    return { profile, repos };
  }
}
