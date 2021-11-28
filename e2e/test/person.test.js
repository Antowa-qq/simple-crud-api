const { server } = require('../../index');
const uuid = require('uuid');
const request = require('supertest');

afterAll(() => {
  server.close();
});

describe('GET /person ', () => {
  test('It should respond with empty an array of persons', async () => {
    const response = await request(server).get('/person');
    expect(response.body).toEqual({ persons: [] });
    expect(response.statusCode).toBe(200);
  });

  test('It should respond with an array of persons', async () => {
    let p1 = await request(server).post('/person').send({ name: 'A', age: 10, hobbies: [] });
    let p2 = await request(server).post('/person').send({ name: 'B', age: 12, hobbies: [] });
    p1 = p1.body;
    p2 = p2.body;
    const response = await request(server).get('/person');
    expect(response.body).toEqual({ persons: [p1, p2] });
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /person/id ', () => {
  test('It should respond with an object with a created person', async () => {
    const personData = { id: uuid.v4(), name: 'A', age: 10, hobbies: [] };
    await request(server)
      .post('/person')
      .send({ ...personData });

    const response = await request(server).get(`/person/${personData.id}`);

    expect(response.body).toEqual({ payload: { person: { ...personData } } });
    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /person/id ', () => {
  test('It should respond with an object with a created person', async () => {
    const personData = { id: uuid.v4(), name: 'A', age: 10, hobbies: [] };
    await request(server)
      .post('/person')
      .send({ ...personData });

    const putData = { name: 'B', age: 12 };

    const response = await request(server).put(`/person/${personData.id}`).send(putData);
    expect(response.body).toEqual({ payload: { person: { ...personData, ...putData } } });
    expect(response.statusCode).toBe(200);
  });
});
