var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

function getRepoIssues(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
       if(response.ok){
            response.json().then(function(data){
            displayIssues(data);

            if(response.headers.get("Link")){
                displayWarning(repo);
            }
        })
       }else { 
           alert("There was a problem with your request");
       }
    });
}

//if more than 30 repos
function displayWarning(repo){
    //add in the warnong 
    limitWarningEl.textContent = "To see more than 30 issues, visit "

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
}
function displayIssues(issues){
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
      }
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold the issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //Create type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or pull request
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //append to container 
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
}
getRepoIssues("facebook/react"); 