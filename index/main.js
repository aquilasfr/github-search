let userInfo
let repoInfo

document.getElementById('submit').addEventListener('click', () => {
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
    document.getElementById('organization').textContent += userInfo.company
    document.getElementById('blog').textContent += userInfo.blog
    document.getElementById('location').textContent += userInfo.location
    document.getElementById('acountCreated').textContent += userInfo.created_at
}