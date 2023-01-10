
const test = {
    post : "I am so angry today because I had to take a piss in the dark and I missed the toilet. Then I forget to clean it and my wife sat on it and now she is pissed off with me because bloody Eskom won't get their shit together.",
    username : "ConstantProbs123",
    createdDate : "19/12/2022"
};




function createPost(post) {
    let newPost = document.createElement('div');
    newPost.classList.add('post')
    newPost.innerHTML = `<div class="post-text"><p>${post.post}</p><p>Posted by ${post.username} at ${post.createdDate}</p></div><div class="rate">Rate</div>`
    document.getElementById('hot').appendChild(newPost);
}

createPost(test);