# Assignment2_Personal-Blog
1. Name : Zhuohang(Skylar) Li
2. Description: This is a repo of assignment2 for CS5610 Web Development

<h2>
    1.Requirement
</h2>
<p>Create a web app using node.js and Express that does Create and Read operations using MongoDB. Example applications: note-taking, recipe collection, movie/book review, blog,... (You could check your topic with us if you are not sure it's suitable)<p>
<ul>
    <li>Show lists of all the existing items in the database</li>
    <li>Show details of each individual item when the user selects</li>
    <li>Add a new item to the database using a form (with at least 2 fields)</li>
    <li>Add a proper error handler to render a 404 page.</li>
    <li>Use templates for pages with dynamic content</li>
</ul>


<h2>2.Development Tools</h2>
<ul>
    <li>CSS/Bootstrap</li>
    <li>Javascript</li>
    <li>Express.js framework</li>
    <li>Node.js</li>
    <li>EJS template</li>
    <li>MongoDB database</li>
</ul>



<h2>3.Objective of My Web App</h2>
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


<h2>4.Setup Instructions</h2>
<ol>
    <li>run npm i</li>
    <li>run node app.js to start the app</li>
    <li>open webpage of heroku:</li>
</ol>


<h2>5.Citations</h2>
 I follow the tutorial of MDN pages and Udemy webcamp, but all the code are wrote by myself.
<ol>
    <li>https://www.udemy.com/course/the-complete-web-development-bootcamp/</li>
    <li>https://www.udemy.com/course/the-complete-web-development-bootcamp/</li>

</ol>


