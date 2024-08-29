import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "./../src/app.module";
import { Import } from "../src/management/dto/requests/import";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Import member', () => {
    const request:Import = {
      members: [{
        cardNumber: 'PLUG-9001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'tomasz.molis@yahoo.com',
        birthDate: new Date('1986-06-27'),
        joinDate: new Date('2022-11-12'),
        phone: '123456789',
      }]
    }
    app.getHttpServer().put('/members', request).expect(200);
  })
});
