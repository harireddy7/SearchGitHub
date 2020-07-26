// Displaying fetched Data & alerts

class UI {
  constructor() {
    this.profileEl = document.getElementById('profile');
  }
  getBlog(blog) {
    if (blog) {
      return /^http/.test(blog) ? blog : `http://${blog}`;
    }
    return blog;
  }
  showProfile(profile) {
    const {
      avatar_url,
      html_url,
      name,
      login,
      public_repos,
      followers,
      following,
      company,
      blog,
      location,
      created_at
    } = profile || {};
    // Make Profile ui
    const profileOutput = `
			<div class="container">
				<div class="card card-body">
					<div class="row">
						<div class="col-md-4 text-center">
							<img src="${avatar_url}" alt="user-photo" class="img-fluid rounded">
							<a href="${html_url}" target="_blank" class="btn btn-primary btn-block mt-2 mb-3 mb-md-0">View Profile</a>
						</div>
						<div class="col-md-8 text-center text-md-left">
							<h4 class="">${name}</h4>
							<p class="lead">@${login}</p>
							<div class="row">
								<div class="col-md-4 mb-1 mb-md-0">
									<span class="badge badge-success">Public Repos: ${public_repos}</span>
								</div>
								<div class="col-md-4 mb-1 mb-md-0">
									<span class="badge badge-primary">Followers: ${followers}</span>
								</div>
								<div class="col-md-4 mb-1 mb-md-0">
									<span class="badge badge-info">Following: ${following}</span>
								</div>
							</div>
							<ul class="list-group mt-3 text-left">
								<li class="list-group-item"><span class="font-weight-bold mr-2">Company:</span> ${company}</li>
								<li class="list-group-item"><span class="font-weight-bold mr-2">Website/Blog:</span><a href="${this.getBlog(
                  blog
                )}" target="_blank">${blog}</a></li>
								<li class="list-group-item"><span class="font-weight-bold mr-2">Location:</span> ${location}</li>
								<li class="list-group-item"><span class="font-weight-bold mr-2">Member Since:</span> ${new Date(
                  created_at
                ).toDateString()}</li>
							</ul>
						</div>
					</div>
				</div>
				<h3 class="mt-2">Latest Repos</h3>
			</div>
		`;
    // insert ui to profile div
    this.profileEl.innerHTML = profileOutput;
  }

  showRepos(repos = []) {
    let reposOutput = '';
    repos.forEach(({ name, html_url, language, stargazers_count, forks, watchers }) => {
      reposOutput += `
				<div class="container">
					<div class="card card-body mb-2 p-1 bg-light">
						<div class="row align-items-center text-center text-md-left">
							<div class="col-md-3">
								<a href="${html_url}" target="_blank" class="btn btn-link">${name}</a>
							</div>
							<div class="col-md-3 text-center text-md-left mb-3 mb-md-0">
								<span class="badge badge-light">${language}</span>
							</div>
							<div class="col-md-6 mb-2 mb-md-0">
								<span class="badge badge-primary">Stars ${stargazers_count}</span>
								<span class="badge badge-success">Forks ${forks}</span>
								<span class="badge badge-info">Watchers ${watchers}</span>
							</div>
						</div>
					</div>
				</div>
			`;
    });

    this.profileEl.innerHTML += reposOutput;
  }

  showAlert(message) {
    // Check & clean previous error alerts
    const errAlert = document.querySelector('.alert');
    if (errAlert) {
      errAlert.remove();
    }

    // New Alert Error
    const alertEl = document.createElement('div');
    alertEl.className = 'alert bg-danger';
    alertEl.textContent = message;

    // search parent
    const searchEl = document.querySelector('.search');
    searchEl.insertBefore(alertEl, this.profileEl);

    setTimeout(function () {
      if (alertEl) {
        alertEl.remove();
      }
    }, 1000);
  }

  clearProfile() {
    this.profileEl.innerHTML = '';
  }
}
