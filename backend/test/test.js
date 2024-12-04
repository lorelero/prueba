const request = require('supertest'); // Importa supertest para hacer solicitudes a la API
const app = require('../index'); // Asegúrate de que la ruta sea correcta para importar tu aplicación


let server;

beforeAll((done) => {
    server = app.listen(process.env.PORT_SERVER || 3000, () => {
        console.log(`Servidor corriendo en http://localhost:${process.env.PORT_SERVER || 3000}`);
        done();
    });
});

afterAll((done) => {
    server.close(done); // Cierra el servidor después de las pruebas
});

describe('Pruebas de la API', () => {
    test('debería devolver un 200 en la ruta /publicaciones', async () => {
        const response = await request(app).get('/publicaciones'); // Cambia '/publicaciones' por la ruta que estés probando
        expect(response.status).toBe(200); // Verifica que el estado de la respuesta sea 200
    });

    test('debería devolver un objeto JSON en la ruta /publicaciones', async () => {
        const response = await request(app).get('/publicaciones'); // Cambia '/publicaciones' por la ruta que estés probando
        expect(response.headers['content-type']).toMatch(/json/); // Verifica que el tipo de contenido sea JSON
    });

    test('debería devolver un 404 para una ruta no válida', async () => {
        const response = await request(app).get('/ruta-invalida'); // Cambia '/ruta-invalida' por una ruta que no exista
        expect(response.status).toBe(404); // Verifica que el estado de la respuesta sea 404
    });

    // Agrega más pruebas según sea necesario
});
