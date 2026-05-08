import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Tienda Online API')
    .setDescription('API REST para gestionar una tienda online: clientes, productos, categorías y órdenes')
    .setVersion('1.0')
    .addTag('clientes', 'Gestión de clientes')
    .addTag('categorias', 'Gestión de categorías de productos')
    .addTag('productos', 'Gestión de productos')
    .addTag('ordenes', 'Gestión de órdenes de compra')
    .addTag('orden-producto', 'Gestión de productos dentro de una orden')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Scalar API Reference (misma versión del ZIP de referencia)
  app.use(
    '/api-docs',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  await app.listen(3000);
  console.log('🚀 Servidor corriendo en: http://localhost:3000');
  console.log('📚 Documentación Scalar en: http://localhost:3000/api-docs');
}
bootstrap();
