import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { PatchVehicleDTO } from './dto/patch-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { LoggerService } from 'src/utils/logger/logger.service';

@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
})
@Controller('vehicles')
export class VehicleController {
  private readonly logger: LoggerService
  constructor(
    private readonly vehicleService: VehicleService,
    
  ) {
      this.logger =  new LoggerService(VehicleController.name)
  }


  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @ApiOperation({ summary: 'Criar Veículo' })
  @ApiResponse({ status: 201, description: 'Veículo criado' })
  @ApiResponse({
    status: 400,
    description: 'Erro durante a criação do veículo',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuario não tem acesso ao recurso',
  })
  @ApiTags('vehicles')
  async create(@Body() data: CreateVehicleDTO, @Req() req) {
    return this.vehicleService.create(data, req.user.id);
  }

  @ApiOperation({ summary: 'Listagem Veículos' })
  @ApiResponse({ status: 200, description: 'Listagem Veículos' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum veículo encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar veículos',
  })
  @ApiQuery({ name: 'skip', required: false, description: 'Quantidade de registros para pular', example: 0 })
  @ApiQuery({ name: 'take', required: false, description: 'Quantidade de registros para pegar', example: 20 })
  @ApiQuery({ name: 'plate', required: false, description: 'Número da placa do veículo', example: 'ABC1234' })
  @ApiQuery({ name: 'model', required: false, description: 'Modelo do veículo', example: 'Fusca' })
  @ApiQuery({ name: 'year', required: false, description: 'Ano do veículo', example: 2020 })
  @ApiQuery({ name: 'brand', required: false, description: 'Marca do veículo', example: 'Volkswagen' })
  @Get()
  @ApiTags('vehicles')
  async read(
    @Query('skip') skip: string = '0',
    @Query('take') take: string = '20',
    @Query('plate') plate?: string,
    @Query('model') model?: string,
    @Query('year') year?: string,
    @Query('brand') brand?: string,
  ) {
    try {
      const skipNumber = parseInt(skip, 10);
      const takeNumber = parseInt(take, 10);
      const yearNumber = year ? parseInt(year, 10) : undefined;

      const filter = {
        ...(plate ? { plate } : {}),
        ...(model ? { model } : {}),
        ...(yearNumber ? { year: yearNumber } : {}),
        ...(brand ? { brand } : {}),
      };

      return await this.vehicleService.list({
        skip: skipNumber,
        take: takeNumber,
        filter,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Erro ao buscar veículos',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  @ApiOperation({ summary: 'Buscar Veículo pelo id' })
  @ApiResponse({ status: 200, description: 'Veículo encontrado.' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  @ApiTags('vehicles')
  @Get(':id')
  async readOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.vehicleService.listOne(id);
  }



  @ApiOperation({ summary: 'Atualizar Veículo pelo id' })
  @ApiResponse({ status: 200, description: 'Veículo atualizado.' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  @ApiTags('vehicles')
  @Put(':id')
  async update(
    @Body() data: UpdateVehicleDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.vehicleService.update(id, data);
  }

  @ApiOperation({ summary: 'Atualizar Veículo parcialmente  pelo id' })
  @ApiResponse({ status: 200, description: 'Veículo atualizado.' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  @ApiTags('vehicles')
  @Patch(':id')
  async updatePartial(
    @Body() data: PatchVehicleDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.vehicleService.updatePartial(id, data);
  }

  @ApiOperation({ summary: 'Desabilitar Veículo' })
  @ApiResponse({ status: 200, description: 'Veículo desabilitado.' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  @ApiTags('vehicles')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.vehicleService.delete(id);
  }

}
