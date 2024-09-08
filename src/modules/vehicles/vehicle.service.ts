import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';



@Injectable()
export class VehicleService {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateVehicleDTO, user_id: string) {
        data.idUserCreate = user_id;
        data.idUserUpdate = user_id;
        return this.prisma.vehicle.create({
            data: data,
        });
    }

    async list({
        skip = 0,
        take = 10,
        filter = {},
        orderBy = { createdAt: 'desc' },
    }: {
        skip?: number;
        take?: number;
        filter?: {
            plate?: string;
            model?: string;
            year?: number;
            brand?: string;
        };
        orderBy?: any;
    }) {

        const dynamicFilter: any = {};

        if (filter.plate) {
            dynamicFilter.plate = { contains: filter.plate, mode: 'insensitive' };
        }
        if (filter.model) {
            dynamicFilter.model = { contains: filter.model, mode: 'insensitive' };
        }
        if (filter.year) {
            dynamicFilter.year = filter.year;
        }
        if (filter.brand) {
            dynamicFilter.brand = { contains: filter.brand, mode: 'insensitive' };
        }

        const totalCount = await this.prisma.vehicle.count({
            where: dynamicFilter,
        });

        const vehicles = await this.prisma.vehicle.findMany({
            skip,
            take,
            where: dynamicFilter,
            orderBy,
            select: {
                id: true,
                plate: true,
                chassis: true,
                renavam: true,
                model: true,
                brand:true,
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


        const hasNextPage = skip + take < totalCount;

        return {
            totalCount,
            hasNextPage,
            vehicles,
        };
    }


    async update(id: string, data: UpdateVehicleDTO) {
        try {
            return await this.prisma.vehicle.update({
                data: data,
                where: {
                    id,
                },
                select: {
                    id: true,
                },
            });
        } catch (error) {
            throw new NotFoundException();
        }
    }


    async delete(id: string) {
        try {
            await this.prisma.vehicle.delete({ where: { id } });
        } catch (error) {
            throw new NotFoundException();
        }
    }


    async listOne(id: string) {
        return this.prisma.vehicle.findUnique({
            where: { id }, select: {
                id: true,
                plate: true,
                chassis: true,
                renavam: true,
                model: true,
                brand:true,
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

    }
}
