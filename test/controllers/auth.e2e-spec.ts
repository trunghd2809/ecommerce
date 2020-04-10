import 'dotenv/config';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { app, database } from '../constants';
import { RegisterDTO } from '../../src/auth/dto/auth.dto';

beforeAll(async() => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('Auth controllers', () => {
  const user: RegisterDTO = {
    username: 'username',
    password: 'password',
  };

  const seller: RegisterDTO = {
    username: 'seller',
    password: 'password',
    seller: true,
  };
  describe('POST #register', () => {
    describe('When user create success', () => {
      it('return user with username and password', () => {
        return request(app)
          .post('/auth/register')
          .set('Accept', 'application/json')
          .send(user)
          .expect(({ body }) => {
            expect(body.token).toBeDefined()
            expect(body.user.username).toEqual('username')
            expect(body.user.password).toBeDefined()
            expect(body.user.seller).toBeFalsy()
          })
          .expect(HttpStatus.CREATED)
      });

      it('return user is seller', () => {
        return request(app)
          .post('/auth/register')
          .set('Accept', 'application/json')
          .send(seller)
          .expect(({ body }) => {
            expect(body.user.seller).toBeTruthy()
          })
          .expect(HttpStatus.CREATED)
      });
    });

    describe('When user create fail', () => {
      it('return code bad request', () => {
        return request(app)
          .post('/auth/register')
          .set('Accept', 'application/json')
          .send(user)
          .expect(({ body }) => {
            expect(body.message).toEqual('User already exists!');
          })
          .expect(HttpStatus.BAD_REQUEST)
      });
      it('return message Validation failed', () => {
        return request(app)
          .post('/auth/register')
          .set('Accept', 'application/json')
          .send({ username: 'username' })
          .expect(({ body }) => {
            expect(body.message).toEqual('Validation failed');
          })
          .expect(HttpStatus.BAD_REQUEST)
      });
    });
  });

  describe('POST #login', () => {
    describe('When user login success', () => {
      it('return username and token', () => {
        return request(app)
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send(user)
          .expect(({ body }) => {
            expect(body.token).toBeDefined()
            expect(body.user.username).toEqual('username')
          })
          .expect(HttpStatus.CREATED)
      });
      it('return seller', () => {
        return request(app)
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send(seller)
          .expect(({ body }) => {
            expect(body.token).toBeDefined()
            expect(body.user.seller).toBeTruthy()
          })
          .expect(HttpStatus.CREATED)
      });
    });
    describe('When user login fail', () => {
      it('return bad request', () => {
        return request(app)
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send({ username: '', password: '' })
          .expect(({ body }) => {
            expect(body.message).toEqual('Invalid credentials')
          })
          .expect(HttpStatus.UNAUTHORIZED)
      });
    });
  });
});