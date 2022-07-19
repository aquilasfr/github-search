let userInfo
let repoInfo 

document.getElementById('submit').addEventListener('click', () => {
    document.getElementById('repositories').innerHTML = 'Repositories: '
    document.getElementById('gists').innerHTML = 'Gists: '
    document.getElementById('followers').innerHTML = 'Followers: '
    document.getElementById('following').innerHTML = 'Following: '
    document.getElementById('organization').innerHTML = 'Organization: '
    document.getElementById('blog').innerHTML = 'Blog: '
    document.getElementById('location').innerHTML = 'Location: '
    document.getElementById('acountCreated').innerHTML = 'account created: '
    document.getElementById('lastRepositories').innerHTML = ''

    fetch(`https://api.github.com/users/${document.getElementById('nameInput').value}`)
    .then(response => response.json()).then(function(data){

        userInfo = data

        return fetch(`https://api.github.com/users/${document.getElementById('nameInput').value}/repos`)
        
    }).then(response => response.json())
        .then((data) => {
            repoInfo = data
            
            displayInfos()
        })
    })
    
    const displayInfos = () => {
        document.getElementById('profilePicture').setAttribute('src', userInfo.avatar_url)
        document.getElementById('repositories').textContent += userInfo.public_repos
        document.getElementById('gists').textContent += userInfo.public_gists
        document.getElementById('following').textContent += userInfo.following
        document.getElementById('followers').textContent += userInfo.followers
        document.getElementById('organization').textContent += userInfo.company  === null ? '' : userInfo.company
        document.getElementById('blog').textContent += userInfo.blog
        document.getElementById('location').textContent += userInfo.location === null ? '' : userInfo.location
        document.getElementById('acountCreated').textContent += userInfo.created_at
        document.getElementById('userProfile').href= userInfo.html_url

        repoInfo.forEach((repository) => {
           let output = ''

           output = `<div class="d-grid gap-3 container">
                        <div class="p-3 bg-light border row">
                            <div class="col-7">
                            </div>
                            <div class="col d-flex justify-content-between align-items-center">
                                ${repository.name}
                            </div>
                            <div>
                                <span id="forks" class="badge text-bg-dark">forks: ${repository.forks_count}</span>
                                <span id="watchers" class="badge  text-bg-danger">watchers: ${repository.watchers_count}</span>
                                <span id="stars" class="badge  text-bg-success">Stars: ${repository.stargazers_count}</span>
                            </div>
                            <button type="button" class="btn btn-secondary btn-sm" href="${repository.html_url}">Repository URL</button>
                        </div>
                    </div>`
            console.log(output)
           document.getElementById('lastRepositories').innerHTML += output
                      
        })

    }




