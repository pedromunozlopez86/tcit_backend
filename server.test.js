const request = require('supertest');
const { AppDataSource } = require('./config/orm-config');
const app = require('./server');

describe('Posts API', () => {
    let testPostId;

    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    describe('GET /posts', () => {
        it('should return all posts', async () => {
            const res = await request(app).get('/posts');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });
    });

    describe('POST /posts', () => {
        it('should create a new post', async () => {
            const newPost = {
                name: 'Test Post',
                description: 'Test Description'
            };

            const res = await request(app)
                .post('/posts')
                .send(newPost);
            
            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe(newPost.name);
            expect(res.body.description).toBe(newPost.description);
            testPostId = res.body.id;
        });
    });

    describe('DELETE /posts/:id', () => {
        it('should delete a post', async () => {
            const res = await request(app)
                .delete(`/posts/${testPostId}`);
            
            expect(res.statusCode).toBe(200);
        });

        it('should return 404 if post not found', async () => {
            const res = await request(app)
                .delete('/posts/999999');
            
            expect(res.statusCode).toBe(404);
        });
    });
});