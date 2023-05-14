const request = require('supertest');
const app = require('../server.js'); // Assuming your server file is named server.js
const Post = require('../models/post.model.js'); // Assuming you have a Post model
const Comment = require('../models/comment.model.js'); // Assuming you have a Comment model

describe('GET /post', () => {
  test('should return an array of posts with comment count', async () => {
    // Create sample posts and comments for testing
    const post1 = await Post.create({ heading: 'Test Post 1', content: 'Lorem ipsum dolor sit amet' });
    const post2 = await Post.create({ heading: 'Test Post 2', content: 'Consectetur adipiscing elit' });

    await Comment.create({ post: post1._id, text: 'Comment 1' });
    await Comment.create({ post: post1._id, text: 'Comment 2' });
    await Comment.create({ post: post2._id, text: 'Comment 3' });

    // Make the GET request to fetch the posts
    const response = await request(app).get('/api/posts');

    // Check the response status
    expect(response.status).toBe(200);

    // Check the response body structure
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(2); // Assuming there are 2 test posts

    // Check the response data for each post
    expect(response.body[0]).toHaveProperty('_id', post1._id.toString());
    expect(response.body[0]).toHaveProperty('heading', 'Test Post 1');
    expect(response.body[0]).toHaveProperty('content', 'Lorem ipsum dolor sit amet');
    expect(response.body[0]).toHaveProperty('commentCount', 2); // Expecting 2 comments for post 1

    expect(response.body[1]).toHaveProperty('_id', post2._id.toString());
    expect(response.body[1]).toHaveProperty('heading', 'Test Post 2');
    expect(response.body[1]).toHaveProperty('content', 'Consectetur adipiscing elit');
    expect(response.body[1]).toHaveProperty('commentCount', 1); // Expecting 1 comment for post 2
  });
});
