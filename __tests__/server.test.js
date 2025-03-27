const request = require('supertest');
const app = require('../app'); // Asegúrate de que la ruta sea correcta

describe('Pruebas del servidor', () => {
	test('respuesta de la ruta /', async () => {
		const response = await request(app).get('/');
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ message: 'Hola Mundo' });
	});
});