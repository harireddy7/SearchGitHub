const github = new GitHub();
const ui = new UI();

// Debouncing
function _debouncer(fn, wait) {
  let timer;

  return function (name) {
    clearTimeout(timer);

    timer = setTimeout(function () {
      fn(name);
      timer = null;
    }, wait);
  };
}

function getGitHubUsers(username) {
  const respData = github.getUsers(username);
  respData
    .then(({ profile, repos }) => {
      if (profile.message && (profile.message === 'Not Found' || profile.message.contains('API rate limit exceeded'))) {
        ui.showAlert(profile.message); // Show Alert
      } else {
        ui.showProfile(profile); // Show UI
        ui.showRepos(repos);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

const getUsersDebounced = _debouncer(getGitHubUsers, 300);

// Event Listeners
document.getElementById('searchUser').addEventListener('keyup', function (e) {
  const regex = /^[a-zA-Z0-9_-]*$/;
  const username = e.target.value.trim();

  if (!username.match(regex) || username.startsWith('-')) {
    ui.showAlert('Please enter valid letters!');
  } else if (username !== '') {
    getUsersDebounced(username);
  } else {
    ui.clearProfile();
  }
});
