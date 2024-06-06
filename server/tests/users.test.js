import app from '../server'
import session  from 'supertest-session'

let testSession = null;

beforeEach(function () {
  testSession = session(app);
});

it('should sign in', function (done) {
  testSession.post('/api/v1/users/login')
    .send({ username: 'asdt560', password: 'justojose1' })
    .expect(200)
    .end(done);
});

describe('after login', function () {

  let authenticatedSession;

  beforeEach(function (done) {
    testSession.post('/api/v1/users/login')
      .send({ username: 'asdt560', password: 'justojose1' })
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  });

  it('should check user', async function () {
    let res = await authenticatedSession.get('/api/v1/users/')
      .expect(200)
    await expect(res.body).toEqual({user: {username: 'asdt560', id: 2}})
  });

});

