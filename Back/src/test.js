const request = require('supertest');
const app = require('./server');

process.once('SIGUSR2', () => server.close(err => process.kill(process.pid, 'SIGUSR2')));

describe('Teste da API', () => {
  test('Deve retornar status 200 ao acessar a rota /users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
  });
});

describe('Teste de login', () => {
  test('Deve retornar autenticado como true para credenciais corretas', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'cadu@cadu', senha: '123' });

    expect(response.statusCode).toBe(200);
    expect(response.body.autenticado).toBe(true);
  });

  test('Deve retornar autenticado como false para credenciais incorretas', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'exemplo@teste.com', senha: 'senhaerrada' });

    expect(response.statusCode).toBe(200);
    expect(response.body.autenticado).toBe(false);
  });
});
