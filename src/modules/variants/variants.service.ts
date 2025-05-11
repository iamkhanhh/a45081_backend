import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterVariantsDto } from './dto/filter-variants.dto';
import { ConfigService } from '@nestjs/config';
import { MongodbProvider } from '@/common/providers/mongodb.provider';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneClinicalSynopsis } from '@/entities';

@Injectable()
export class VariantsService {

  constructor(
    @InjectRepository(GeneClinicalSynopsis) private geneClinicalSynopsisRepository: Repository<GeneClinicalSynopsis>,
    private readonly configService: ConfigService,
    private readonly mongodbProvider: MongodbProvider,
  ) { }

  async findOne(id: number, page: number, pageSize: number, filter: FilterVariantsDto) {
    const offset = (page - 1) * pageSize;
    const pageBegin = offset + 1;
    const pageEnd = pageBegin + pageSize - 1;

    const db = await this.mongodbProvider.mongodbConnect();
    const collection = db.collection(`${this.configService.get<string>('MONGO_DB_PREFIX')}_${id}`);
    if (!collection) {
      return {
        status: "error",
        message: "Collection not found",
        data: []
      };
    }

    let pipeline = []
    let pipeCount = []
    let matchAnd = this.matchFilter(filter);

    if (matchAnd.length > 0) {
      const match = { $match: { $and: matchAnd } };
      pipeline.push(match);
      pipeCount.push(match);
    }

    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: pageSize });
    pipeline.push({ $project: this.projectFields() });
    pipeCount.push({ $group: { _id: null, count: { $sum: 1 } } });

    const [data, count] = await Promise.all([
      collection.aggregate(pipeline, { allowDiskUse: true }).toArray(),
      collection.aggregate(pipeCount, { allowDiskUse: true }).toArray()
    ]);

    for (const item of data) {
      const omim = await this.getOmimDiseaseForGeneName(item.gene);
      item.omimDisease = omim?.pheno_name || null;
      item.gene_omim = omim?.gene_omim || null;
    }

    await this.mongodbProvider.mongodbDisconnect();

    return {
      status: "success",
      message: "Get variants successfully",
      data: data,
      totalItems: count[0]?.count || 0,
      totalPages: Math.ceil((count[0]?.count || 0) / pageSize),
      pageBegin,
      pageEnd
    };
  }

  private matchFilter(filter: FilterVariantsDto) {
    let matchAnd = [];

    // Find variants with filter:  FilterVariantsDto {
    //   chrom: [ '2', '20', 'X' ],
    //   readDepthSign: 'lower',
    //   readDepth: 2,
    //   AFSign: 'lower',
    //   alleleFraction: -2,
    //   gnomAdSign: 'lower',
    //   gnomAd: 0.01,
    //   gene: [ 'WASH7P' ],
    //   annotation: [ 'missense' ],
    //   classification: [ 'likely benign', 'pathogenic' ]
    // }

    if (filter?.chrom?.length) {
      matchAnd.push({ chrom: { $in: filter.chrom } });
    }

    if (filter?.gene?.length) {
      matchAnd.push({ gene: { $in: filter.gene } });
    }

    if (filter?.annotation?.length) {
      matchAnd.push({ codingEffect: { $in: filter.annotation } });
    }

    if (filter?.classification?.length) {
      matchAnd.push({ CLINSIG_FINAL: { $in: filter.classification } });
    }

    if (filter?.alleleFraction !== undefined && filter?.AFSign) {
      matchAnd.push({
        alleleFrequency: {
          [filter.AFSign === 'lower' ? '$lte' : '$gte']: filter.alleleFraction
        }
      });
    }

    if (filter?.gnomAd !== undefined && filter?.gnomAdSign) {
      matchAnd.push({
        gnomAD_exome_ALL: {
          [filter.gnomAdSign === 'lower' ? '$lte' : '$gte']: filter.gnomAd
        }
      });
    }

    if (filter?.readDepth !== undefined && filter?.readDepthSign) {
      matchAnd.push({
        readDepth: {
          [filter.readDepthSign === 'lower' ? '$lte' : '$gte']: filter.readDepth
        }
      });
    }

    return matchAnd;
  }

  private projectFields() {
    return {
      id: '$_id',
      gene: '$gene',
      transcript_id: '$transcript',
      position: '$inputPos',
      chrom: '$chrom',
      rsid: '$rsId',
      REF: '$REF',
      ALT: '$ALT',
      cnomen: '$cNomen',
      pnomen: '$pNomen',
      function: '$codingEffect',
      location: '$varLocation',
      coverage: '$coverage',
      gnomad: '$gnomAD_exome_ALL',
      gnomad_ALL: '$gnomAD_exome_ALL',
      cosmicID: '$cosmicIds',
      classification: '$CLINSIG_FINAL',
      clinvar: '$Clinvar_VARIANT_ID',
      gnomAD_AFR: '$gnomAD_exome_AFR',
      gnomAD_AMR: '$gnomAD_exome_AMR',
      Consequence: '$Consequence',
      EXON: '$EXON',
      INTRON: '$INTRON',
      DOMAINS: '$DOMAINS',
      gnomAD_genome_AMR: '$gnomAD_genome_AMR',
      gnomADe_AMR: '$gnomADe_AMR',
      CLINSIG: '$CLINSIG',
      NEW_CLINSIG: '$NEW_CLINSIG',
      CLNACC: '$CLNACC',
      SOMATIC: '$SOMATIC',
      cosmics: '$cosmics',
      SIFT_score: '$SIFT_score',
      Polyphen2_HDIV_score: '$Polyphen2_HDIV_score',
      CADD_PHRED: '$CADD_PHRED',
      PUBMED: '$PUBMED',
      gold_stars: '$gold_stars',
      review_status: '$review_status',
      Clinvar_VARIANT_ID: '$Clinvar_VARIANT_ID',
      gene_omim: '$gene_omim',
      GeneSplicer: '$GeneSplicer',
      gnomADe_AFR: '$gnomADe_AFR',
      gnomAD_genome_AFR: '$gnomAD_genome_AFR',
      '1000g_AFR_AF': '$1000g_AFR_AF',
      '1000g_AMR_AF': '$1000g_AMR_AF',
      gnomADe_EAS: '$gnomADe_EAS',
      gnomAD_genome_EAS: '$gnomAD_genome_EAS',
      gnomADe_SAS: '$gnomADe_SAS',
      '1000g_SAS_AF': '$1000g_SAS_AF',
      gnomADe_ASJ: '$gnomADe_ASJ',
      gnomAD_genome_ASJ: '$gnomAD_genome_ASJ',
      gnomADe_FIN: '$gnomADe_FIN',
      gnomAD_genome_FIN: '$gnomAD_genome_FIN',
      '1000g_EUR_AF': '$1000g_EUR_AF',
      gnomADe_NFE: '$gnomADe_NFE',
      gnomAD_genome_NFE: '$gnomAD_genome_NFE',
      gnomADe_OTH: '$gnomADe_OTH',
      gnomADe_ALL: '$gnomADe_ALL',
      gnomAD_genome_ALL: '$gnomAD_genome_ALL',
      '1000g_AF': '$1000g_AF',
      gnomAD_genome_OTH: '$gnomAD_genome_OTH',
      CANONICAL: '$CANONICAL',
      '1000g_EAS_AF': '$1000g_EAS_AF',
      HGNC_SYMONYMS: '$HGNC_SYMONYMS',
      HGNC_PRE_SYMBOL: '$HGNC_PRE_SYMBOL',
      VAR_SCORE: '$VAR_SCORE'
    };
  }

  async getOmimDiseaseForGeneName(geneName: string) {
    try {
      const results = await this.geneClinicalSynopsisRepository
        .createQueryBuilder('gene')
        .select([
          'gene.gene_name AS gene_name',
          'gene.gene_omim AS gene_omim',
          'GROUP_CONCAT(gene.pheno_name) AS pheno_name',
        ])
        .where('gene.gene_name = :geneName', { geneName })
        .groupBy('gene.gene_name, gene.gene_omim')
        .getRawOne();

      if (results && results.pheno_name) {
        return {
          pheno_name: results.pheno_name,
          gene_omim: results.gene_omim,
        };
      }

      return {
        pheno_name: '',
        gene_omim: '',
      };
    } catch (error) {
      console.log('VariantsService@getOmimDiseaseForGeneName:', error);
      throw new BadRequestException('Unable to connect to the database, please try again later!');
    }
  }
}
