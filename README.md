# Assignment2_Personal-Blog
-Name : Zhuohang(Skylar) Li
-Description: This is a repo of assignment2 for CS5610 Web Development

<h1>
    Requirement
</h1>
<p>Create a web app using node.js and Express that does Create and Read operations using MongoDB. Example applications: note-taking, recipe collection, movie/book review, blog,... (You could check your topic with us if you are not sure it's suitable)<p>
<ul>
    <li>Show lists of all the existing items in the database</li>
    <li>Show details of each individual item when the user selects</li>
    <li>Add a new item to the database using a form (with at least 2 fields)</li>
    <li>Add a proper error handler to render a 404 page.</li>
    <li>Use templates for pages with dynamic content</li>
</ul>

<h1>Objective of My Web App</h1>
<h3>Add a new blog</h3>
When User click "Add a New Post" at the top, it will render to compose page. In the compose page, user can add new title and content
of the new blog, when user clicks "publish", the new post will be added into database. It will redirect to home page, which will show
the new post appending to previous posts.
If the blog content is long, the home page just show part of it. User can click "Read More" to read the whole page.

<h3>View the detail of the blog.</h3>
When you click "Read More", it will render to the page of this posts by it's ObjectId. The detailed pages will show the complete content
of the blog.

<h3>Delete the blog.</h3>
When you click "Delete" button below the post, it will be deleted and redirect to the home page, which will show the blogs without this 
blog.

