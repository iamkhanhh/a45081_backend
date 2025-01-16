import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOptionsOrder, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { Repository } from 'typeorm';
import { Pagination } from '../interfaces/pagination.interface';
import { AbstractEntity } from '@/entities/abstract.entity';

@Injectable()
export class PaginationProvider {

  public async paginate<T extends AbstractEntity>(
    page: number,
    pageSize: number,
    repository: Repository<T>,
    filters: FindOptionsWhere<T> = {}
  ): Promise<Pagination<T>> {
    page = Math.max(1, page);
    pageSize = Math.max(1, pageSize);
    let results = [], totalItems = 0, totalPages = 0;
    const where = { ...filters };
    const offset = (page - 1) * pageSize;
    const pageBegin = offset + 1;
    const pageEnd = pageBegin + pageSize - 1;

    try {
        results = await repository.find({
            where,
            skip: offset,
            take: pageSize,
            order: {
              createdAt: "DESC"
          } as FindOptionsOrder<T>
        });
        totalItems = await repository.count({
            where
        });
        totalPages = Math.ceil(totalItems / pageSize);
    } catch (error) {
        console.log('PaginationProvider@paginate: ', error);
        throw new BadRequestException("Unable connect to the database, please try later!");
    }
  

    let finalResponse =  {
        status: 'success',
        data: results,
        totalItems: totalItems,
        totalPages: totalPages,
        pageBegin,
        pageEnd
    };;

    return finalResponse;
  }
}