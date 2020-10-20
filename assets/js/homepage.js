function getUserRepos(user){
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    console.log("Call made");
    //Make a request to the url
    fetch(apiUrl).then(function(response){
        if(response.ok){// ok is true if all good false if error
            response.json().then(function(data){
                displayRepos(data, user);
            });
        }else {
            alert("Error " + response.statusText); //e.getMessage or println(e);
        }
    })
}
function formSubmitHandler(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();
    if(username){
        getUserRepos(username);
    } else {
        alert("Please enter a GitHub username");
    }
}

function displayRepos(repos, searchTerm) { 
    //if no repos
    if(repos.length === 0){
        repoContainerEl.textContent = "No Repositories Found";
        return;
    }
    //ckear out old and display new
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //actually display the repos
    //repos is an array of items
    for(var i = 0; i < repos.length; i++){
        //format the name
        var repoName= repos[i].owner.login + "/" + repos[i].name;
        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        
        // create a span element to hold repo name
        var titleEl =  document.createElement("span");
        titleEl.textContent= repoName;

        // add to container
        repoEl.appendChild(titleEl);
        // create status element
        var statusEl = document.createElement("span");

        //check if current repo has issues
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
          }
        // append to container
        repoEl.appendChild(statusEl);
        //append container to dom
        repoContainerEl.appendChild(repoEl);
    }
}
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
//repo display container
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

userFormEl.addEventListener("submit", formSubmitHandler);