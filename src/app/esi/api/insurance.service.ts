/**
 * EVE Swagger Interface
 * An OpenAPI for EVE Online
 *
 * OpenAPI spec version: 0.8.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { BadGateway } from '../model/badGateway';
import { BadRequest } from '../model/badRequest';
import { GetInsurancePrices200Ok } from '../model/getInsurancePrices200Ok';
import { InternalServerError } from '../model/internalServerError';
import { ServiceUnavailable } from '../model/serviceUnavailable';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class InsuranceService {

    protected basePath = 'https://esi.tech.ccp.is/dev';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * List insurance levels
     * Return available insurance levels for all ship types  --- Alternate route: &#x60;/latest/insurance/prices/&#x60;  Alternate route: &#x60;/legacy/insurance/prices/&#x60;  Alternate route: &#x60;/v1/insurance/prices/&#x60;  --- This route is cached for up to 3600 seconds
     * @param datasource The server name you would like data from
     * @param language Language to use in the response
     * @param userAgent Client identifier, takes precedence over headers
     * @param xUserAgent Client identifier, takes precedence over User-Agent
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getInsurancePrices(datasource?: 'tranquility' | 'singularity', language?: 'de' | 'en-us' | 'fr' | 'ja' | 'ru' | 'zh', userAgent?: string, xUserAgent?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<GetInsurancePrices200Ok>>;
    public getInsurancePrices(datasource?: 'tranquility' | 'singularity', language?: 'de' | 'en-us' | 'fr' | 'ja' | 'ru' | 'zh', userAgent?: string, xUserAgent?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<GetInsurancePrices200Ok>>>;
    public getInsurancePrices(datasource?: 'tranquility' | 'singularity', language?: 'de' | 'en-us' | 'fr' | 'ja' | 'ru' | 'zh', userAgent?: string, xUserAgent?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<GetInsurancePrices200Ok>>>;
    public getInsurancePrices(datasource?: 'tranquility' | 'singularity', language?: 'de' | 'en-us' | 'fr' | 'ja' | 'ru' | 'zh', userAgent?: string, xUserAgent?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (datasource !== undefined) {
            queryParameters = queryParameters.set('datasource', <any>datasource);
        }
        if (language !== undefined) {
            queryParameters = queryParameters.set('language', <any>language);
        }
        if (userAgent !== undefined) {
            queryParameters = queryParameters.set('user_agent', <any>userAgent);
        }

        let headers = this.defaultHeaders;
        if (xUserAgent !== undefined && xUserAgent !== null) {
            headers = headers.set('X-User-Agent', String(xUserAgent));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<GetInsurancePrices200Ok>>(`${this.basePath}/insurance/prices/`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
