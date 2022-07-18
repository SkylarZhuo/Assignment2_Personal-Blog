# Personal-Blog
1. Name : Zhuohang(Skylar) Li
2. Description: This is a repo of assignment2 for CS5610 Web Development. User can add a new post, view the post details and delete the post in this website.
3. visit here: https://fierce-sea-59435.herokuapp.com/


<h2>1.Development Tools</h2>
<ul>
    <li>CSS/Bootstrap</li>
    <li>Javascript</li>
    <li>Express.js framework</li>
    <li>Node.js</li>
    <li>EJS template</li>
    <li>MongoDB database</li>
</ul>



<h2>2.Objective of My Web App</h2>
<h3>Add a new blog</h3>
When User click "Add a New Post" at the top, it will render to compose page. In the compose page, user can add new title and content
of the new blog, when user clicks "publish", the new post will be added into database. It will redirect to home page, which will show
the new post appending to previous posts.
If the blog content is long, the home page just show part of it. User can click "Read More" to read the whole page.
<img src="/public/images/demo_1.png"></img>
<img src="/public/images/demo_2.png"></img>

<hr>
<h3>View the detail of the blog.</h3>
When you click "Read More", it will render to the page of this posts by it's ObjectId. The detailed pages will show the complete content
of the blog.
<img src="/public/images/demo_3.png"></img>
<img src="/public/images/demo_4.png"></img>

<hr>
<h3>Delete the blog.</h3>
When you click "Delete" button below the post, it will be deleted and redirect to the home page, which will show the blogs without this 
blog.
<img src="/public/images/demo_5.png"></img>
<img src="/public/images/demo_6.png"></img>

<hr>
<h3>Other page</h3>
The blog also contain two static web pages--about and contact page;
<img src="/public/images/about_page.png"></img>
<img src="/public/images/contact_page.png"></img>


<h2>3.Setup Instructions</h2>
<ol>
    <li>run npm i</li>
    <li>run node app.js to start the app</li>
    <li>open webpage of heroku:</li>
</ol>




