import 'dotenv/config';
import * as request from 'supertest';
import { app } from '../constants';

describe('ROOT', () => {
  it('/ (GET) Should ping', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
