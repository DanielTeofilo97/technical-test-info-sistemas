import { PrismaService } from '../../prisma/prisma.service';
import { VehicleService } from './vehicle.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
const fakeVehicles = [
    {
        id: "6faba3f4-0a98-4b51-85da-4017e7118bdd",
        plate: "HRO3E24",
        chassis: "8AD3CN6BTBG035202",
        renavam: "52036153225",
        model: "607 Sedan 3.0 V6",
        brand: "Peugeot",
        createdAt: "2024-09-07T17:49:35.173Z",
        updatedAt: "2024-09-07T17:49:35.173Z",
        year: 2024,
        createdBy: {
            name: "Daniel Teófilo"
        },
        updatedBy: {
            name: "Daniel Teófilo"
        }
    },
    {
        id: "3c627fa7-3f7f-4a8a-a8b8-23193f5593e9",
        plate: "HEO3E24",
        chassis: "8AD3CN6BTBG035202",
        renavam: "52036153225",
        model: "607 Sedan 3.0 V6",
        brand: "Peugeot",
        createdAt: "2024-09-07T17:49:05.924Z",
        updatedAt: "2024-09-07T17:49:05.924Z",
        year: 2024,
        createdBy: {
            name: "Daniel Teófilo"
        },
        updatedBy: {
            name: "Daniel Teófilo"
        }
    },
    {
        id: "82698c5e-df50-4c32-8538-732be0e516d0",
        plate: "HCH1669",
        chassis: "8AD3CN6BTBG035202",
        renavam: "52036153225",
        model: "607 Sedan 3.0 V6",
        brand: "Peugeot",
        createdAt: "2024-09-07T17:46:46.921Z",
        updatedAt: "2024-09-07T17:46:46.921Z",
        year: 2024,
        createdBy: {
            name: "Daniel Teófilo"
        },
        updatedBy: {
            name: "Daniel Teófilo"
        }
    },
]

const prismaMock = {
    vehicle: {
        create: jest.fn().mockReturnValue(fakeVehicles[0]),
        findUnique: jest.fn().mockResolvedValue(fakeVehicles[0]),
        count: jest.fn().mockResolvedValue(fakeVehicles.length),
        findMany: jest.fn().mockResolvedValue(fakeVehicles),
        update: jest.fn().mockResolvedValue(fakeVehicles[0]),
        delete: jest.fn(),
    },
};

describe('VehicleService', () => {
    let service: VehicleService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehicleService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        service = module.get<VehicleService>(VehicleService);
        prisma = module.get<PrismaService>(PrismaService);
    });


    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('list', () => {
        it(`should return an array of posts`, async () => {
            const response = await service.list({
                skip: 0,
                take: 10,
                filter: {},
                orderBy: { createdAt: 'desc' },
            });

            expect(response.vehicles).toEqual(fakeVehicles);
            expect(prisma.vehicle.findMany).toHaveBeenCalledTimes(1);
            expect(prisma.vehicle.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
                where: {},
                orderBy: { createdAt: 'desc' },
                select: {
                    brand: true,
                    chassis: true,
                    createdAt: true,
                    createdBy: {
                        select: { name: true },
                    },
                    id: true,
                    model: true,
                    plate: true,
                    renavam: true,
                    updatedAt: true,
                    updatedBy: {
                        select: { name: true },
                    },
                    year: true,
                },
            });
        });
    });

    describe('create', () => {

        it(`should create a new vehicle`, async () => {
            const response = await service.create({
                "plate": "HRO3E24",
                "chassis": "8AD3CN6BTBG035202",
                "renavam": "52036153225",
                "model": "607 Sedan 3.0 V6",
                "brand": "Peugeot",
                "year": 2024
            }, '4df4d18e-89f8-4920-91ed-de84753029aa');

            expect(response).toBe(fakeVehicles[0]);
            expect(prisma.vehicle.create).toHaveBeenCalledTimes(1);
            expect(prisma.vehicle.create).toHaveBeenCalledWith({
                data: {
                    plate: "HRO3E24",
                    chassis: "8AD3CN6BTBG035202",
                    renavam: "52036153225",
                    model: "607 Sedan 3.0 V6",
                    brand: "Peugeot",
                    year: 2024,
                    idUserCreate: "4df4d18e-89f8-4920-91ed-de84753029aa",
                    idUserUpdate: "4df4d18e-89f8-4920-91ed-de84753029aa",
                }
            });
        });
    });

    describe('update', () => {
        it(`should update a vehicle`, async () => {
            const response = await service.update('6faba3f4-0a98-4b51-85da-4017e7118bdd', fakeVehicles[0]);
    
            expect(response).toEqual(fakeVehicles[0]);
            expect(prisma.vehicle.update).toHaveBeenCalledTimes(1);
            expect(prisma.vehicle.update).toHaveBeenCalledWith({
                where: { id: '6faba3f4-0a98-4b51-85da-4017e7118bdd' },
                data: fakeVehicles[0],
                // Inclua a propriedade `select` se for usada no método `update`
                select: {
                    id: true,
                    // Adicione outros campos se forem selecionados
                },
            });
        });
    
        it(`should return NotFoundException when no vehicle is found`, async () => {
            const unexistingPost = {
                id: '6faba3f4-0a98-4b51-85da-4017e7118bd9',
                plate: "HRO3E24",
                chassis: "8AD3CN6BTBG035202",
                renavam: "52036153225",
                model: "607 Sedan 3.0 V6",
                brand: "Peugeot",
                year: 2024
            };
    
            jest.spyOn(prisma.vehicle, 'update').mockRejectedValue(new Error());
    
            try {
                await service.update('6faba3f4-0a98-4b51-85da-4017e7118bd9', unexistingPost);
            } catch (error) {
                expect(error).toEqual(new NotFoundException());
            }
    
            expect(prisma.vehicle.update).toHaveBeenCalledWith({
                where: { id: '6faba3f4-0a98-4b51-85da-4017e7118bd9' },
                data: unexistingPost,
                // Inclua a propriedade `select` se for usada no método `update`
                select: {
                    id: true,
                    // Adicione outros campos se forem selecionados
                },
            });
        });
    });
    describe('listOne', () => {
        it(`should return a single vehicle`, async () => {
            const response = await service.listOne('6faba3f4-0a98-4b51-85da-4017e7118bdd');

            expect(response).toEqual(fakeVehicles[0]);
            expect(prisma.vehicle.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.vehicle.findUnique).toHaveBeenCalledWith({
                where: { id: '6faba3f4-0a98-4b51-85da-4017e7118bdd' },
                select: {
                    id: true,
                    plate: true,
                    chassis: true,
                    renavam: true,
                    model: true,
                    brand: true,
                    createdAt: true,
                    updatedAt: true,
                    year: true,
                    createdBy: {
                        select: {
                            name: true,
                        },
                    },
                    updatedBy: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
        });

        it(`should return nothing when vehicle is not found`, async () => {
            jest.spyOn(prisma.vehicle, 'findUnique').mockResolvedValue(undefined);

            const response = await service.listOne('82698c5e-df50-4c32-8538-732be0e516d1');

            expect(response).toBeUndefined();
            expect(prisma.vehicle.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.vehicle.findUnique).toHaveBeenCalledWith({
                where: { id: '82698c5e-df50-4c32-8538-732be0e516d1' },
                select: {
                    id: true,
                    plate: true,
                    chassis: true,
                    renavam: true,
                    model: true,
                    brand: true,
                    createdAt: true,
                    updatedAt: true,
                    year: true,
                    createdBy: {
                        select: {
                            name: true,
                        },
                    },
                    updatedBy: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
        });
    });
    describe('delete', () => {
        it(`should delete vehicle and return empty body`, async () => {
            expect(await service.delete('6781f01f-cb92-4e82-a1b2-2dedca6634ac')).toBeUndefined();
            expect(prisma.vehicle.delete).toHaveBeenCalledTimes(1);
            expect(prisma.vehicle.delete).toHaveBeenCalledWith({ where: { id: '6781f01f-cb92-4e82-a1b2-2dedca6634ac' } });
        });

        it(`should return NotFoundException if vehicle does not exist`, async () => {
            jest.spyOn(prisma.vehicle, 'delete').mockRejectedValue(new Error());

            try {
                await service.delete('82698c5e-df50-4c32-8538-732be0e516d7');
            } catch (error) {
                expect(error).toEqual(new NotFoundException());
            }

            expect(prisma.vehicle.delete).toHaveBeenCalledTimes(1);
            expect(prisma.vehicle.delete).toHaveBeenCalledWith({
                where: { id: '82698c5e-df50-4c32-8538-732be0e516d7' },
            });
        });
    });
});
