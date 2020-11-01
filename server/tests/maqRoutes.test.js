const request = require('supertest');
const server = require('../server');

describe('Endpoints', () => {

  it('Obtener listado de máquinas', async () => {
    const res = await request(server)
      .get('/maq')
    expect(res.statusCode).toEqual(200);
  });
  it('Crear máquina', async () => {
    const res = await request(server)
      .post('/maq')
      .send({
        marca:"Toyota",
        modelo:"Hylux",
        tipo:"Camioneta",
        patente:"AABB11"
      });
    expect(res.statusCode).toEqual(200);
  });
  it('Editar máquina', async () => {
    const res = await request(server)
      .post('/maq')
      .send({
        marca:"Toyota",
        modelo:"Hylux",
        tipo:"Camioneta",
        patente:"AABB11"
      });
    expect(res.statusCode).toEqual(200);
  });
  it('Error al editar máquina inexistente', async () => {
    const res = await request(server)
      .put('/maq/123')
      .send({
        marca:"Toyota",
        modelo:"Hylux",
        tipo:"Camioneta",
        patente:"AABB11"
      });
    expect(res.statusCode).toEqual(404);
  });
  it('Error al eliminar máquina inexistente', async () => {
    const res = await request(server)
      .delete('/maq/123')
    expect(res.statusCode).toEqual(404);
  });
  it('Error al crear máquina con datos faltantes', async () => {
    const res = await request(server)
      .post('/maq')
      .send({
        marca:"Toyota",
        modelo:"Hylux",
        patente:"AABB11"
      });
    expect(res.statusCode).toEqual(500);
  });
})