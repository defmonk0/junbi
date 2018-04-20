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
import { Forbidden } from '../model/forbidden';
import { InternalServerError } from '../model/internalServerError';
import { PostUiOpenwindowNewmailNewMail } from '../model/postUiOpenwindowNewmailNewMail';
import { PostUiOpenwindowNewmailUnprocessableEntity } from '../model/postUiOpenwindowNewmailUnprocessableEntity';
import { ServiceUnavailable } from '../model/serviceUnavailable';
import { Unauthorized } from '../model/unauthorized';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UserInterfaceService {

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
     * Set Autopilot Waypoint
     * Set a solar system as autopilot waypoint  --- Alternate route: &#x60;/latest/ui/autopilot/waypoint/&#x60;  Alternate route: &#x60;/v2/ui/autopilot/waypoint/&#x60; 
     * @param addToBeginning Whether this solar system should be added to the beginning of all waypoints
     * @param clearOtherWaypoints Whether clean other waypoints beforing adding this one
     * @param destinationId The destination to travel to, can be solar system, station or structure&#39;s id
     * @param datasource The server name you would like data from
     * @param token Access token to use if unable to set a header
     * @param userAgent Client identifier, takes precedence over headers
     * @param xUserAgent Client identifier, takes precedence over User-Agent
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postUiAutopilotWaypoint(addToBeginning: boolean, clearOtherWaypoints: boolean, destinationId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postUiAutopilotWaypoint(addToBeginning: boolean, clearOtherWaypoints: boolean, destinationId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postUiAutopilotWaypoint(addToBeginning: boolean, clearOtherWaypoints: boolean, destinationId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postUiAutopilotWaypoint(addToBeginning: boolean, clearOtherWaypoints: boolean, destinationId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (addToBeginning === null || addToBeginning === undefined) {
            throw new Error('Required parameter addToBeginning was null or undefined when calling postUiAutopilotWaypoint.');
        }
        if (clearOtherWaypoints === null || clearOtherWaypoints === undefined) {
            throw new Error('Required parameter clearOtherWaypoints was null or undefined when calling postUiAutopilotWaypoint.');
        }
        if (destinationId === null || destinationId === undefined) {
            throw new Error('Required parameter destinationId was null or undefined when calling postUiAutopilotWaypoint.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (addToBeginning !== undefined) {
            queryParameters = queryParameters.set('add_to_beginning', <any>addToBeginning);
        }
        if (clearOtherWaypoints !== undefined) {
            queryParameters = queryParameters.set('clear_other_waypoints', <any>clearOtherWaypoints);
        }
        if (datasource !== undefined) {
            queryParameters = queryParameters.set('datasource', <any>datasource);
        }
        if (destinationId !== undefined) {
            queryParameters = queryParameters.set('destination_id', <any>destinationId);
        }
        if (token !== undefined) {
            queryParameters = queryParameters.set('token', <any>token);
        }
        if (userAgent !== undefined) {
            queryParameters = queryParameters.set('user_agent', <any>userAgent);
        }

        let headers = this.defaultHeaders;
        if (xUserAgent !== undefined && xUserAgent !== null) {
            headers = headers.set('X-User-Agent', String(xUserAgent));
        }

        // authentication (evesso) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.post<any>(`${this.basePath}/ui/autopilot/waypoint/`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Open Contract Window
     * Open the contract window inside the client  --- Alternate route: &#x60;/latest/ui/openwindow/contract/&#x60;  Alternate route: &#x60;/legacy/ui/openwindow/contract/&#x60;  Alternate route: &#x60;/v1/ui/openwindow/contract/&#x60; 
     * @param contractId The contract to open
     * @param datasource The server name you would like data from
     * @param token Access token to use if unable to set a header
     * @param userAgent Client identifier, takes precedence over headers
     * @param xUserAgent Client identifier, takes precedence over User-Agent
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postUiOpenwindowContract(contractId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postUiOpenwindowContract(contractId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postUiOpenwindowContract(contractId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postUiOpenwindowContract(contractId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (contractId === null || contractId === undefined) {
            throw new Error('Required parameter contractId was null or undefined when calling postUiOpenwindowContract.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contractId !== undefined) {
            queryParameters = queryParameters.set('contract_id', <any>contractId);
        }
        if (datasource !== undefined) {
            queryParameters = queryParameters.set('datasource', <any>datasource);
        }
        if (token !== undefined) {
            queryParameters = queryParameters.set('token', <any>token);
        }
        if (userAgent !== undefined) {
            queryParameters = queryParameters.set('user_agent', <any>userAgent);
        }

        let headers = this.defaultHeaders;
        if (xUserAgent !== undefined && xUserAgent !== null) {
            headers = headers.set('X-User-Agent', String(xUserAgent));
        }

        // authentication (evesso) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.post<any>(`${this.basePath}/ui/openwindow/contract/`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Open Information Window
     * Open the information window for a character, corporation or alliance inside the client  --- Alternate route: &#x60;/latest/ui/openwindow/information/&#x60;  Alternate route: &#x60;/legacy/ui/openwindow/information/&#x60;  Alternate route: &#x60;/v1/ui/openwindow/information/&#x60; 
     * @param targetId The target to open
     * @param datasource The server name you would like data from
     * @param token Access token to use if unable to set a header
     * @param userAgent Client identifier, takes precedence over headers
     * @param xUserAgent Client identifier, takes precedence over User-Agent
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postUiOpenwindowInformation(targetId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postUiOpenwindowInformation(targetId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postUiOpenwindowInformation(targetId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postUiOpenwindowInformation(targetId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (targetId === null || targetId === undefined) {
            throw new Error('Required parameter targetId was null or undefined when calling postUiOpenwindowInformation.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (datasource !== undefined) {
            queryParameters = queryParameters.set('datasource', <any>datasource);
        }
        if (targetId !== undefined) {
            queryParameters = queryParameters.set('target_id', <any>targetId);
        }
        if (token !== undefined) {
            queryParameters = queryParameters.set('token', <any>token);
        }
        if (userAgent !== undefined) {
            queryParameters = queryParameters.set('user_agent', <any>userAgent);
        }

        let headers = this.defaultHeaders;
        if (xUserAgent !== undefined && xUserAgent !== null) {
            headers = headers.set('X-User-Agent', String(xUserAgent));
        }

        // authentication (evesso) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.post<any>(`${this.basePath}/ui/openwindow/information/`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Open Market Details
     * Open the market details window for a specific typeID inside the client  --- Alternate route: &#x60;/latest/ui/openwindow/marketdetails/&#x60;  Alternate route: &#x60;/legacy/ui/openwindow/marketdetails/&#x60;  Alternate route: &#x60;/v1/ui/openwindow/marketdetails/&#x60; 
     * @param typeId The item type to open in market window
     * @param datasource The server name you would like data from
     * @param token Access token to use if unable to set a header
     * @param userAgent Client identifier, takes precedence over headers
     * @param xUserAgent Client identifier, takes precedence over User-Agent
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postUiOpenwindowMarketdetails(typeId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postUiOpenwindowMarketdetails(typeId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postUiOpenwindowMarketdetails(typeId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postUiOpenwindowMarketdetails(typeId: number, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (typeId === null || typeId === undefined) {
            throw new Error('Required parameter typeId was null or undefined when calling postUiOpenwindowMarketdetails.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (datasource !== undefined) {
            queryParameters = queryParameters.set('datasource', <any>datasource);
        }
        if (token !== undefined) {
            queryParameters = queryParameters.set('token', <any>token);
        }
        if (typeId !== undefined) {
            queryParameters = queryParameters.set('type_id', <any>typeId);
        }
        if (userAgent !== undefined) {
            queryParameters = queryParameters.set('user_agent', <any>userAgent);
        }

        let headers = this.defaultHeaders;
        if (xUserAgent !== undefined && xUserAgent !== null) {
            headers = headers.set('X-User-Agent', String(xUserAgent));
        }

        // authentication (evesso) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.post<any>(`${this.basePath}/ui/openwindow/marketdetails/`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Open New Mail Window
     * Open the New Mail window, according to settings from the request if applicable  --- Alternate route: &#x60;/latest/ui/openwindow/newmail/&#x60;  Alternate route: &#x60;/legacy/ui/openwindow/newmail/&#x60;  Alternate route: &#x60;/v1/ui/openwindow/newmail/&#x60; 
     * @param newMail The details of mail to create
     * @param datasource The server name you would like data from
     * @param token Access token to use if unable to set a header
     * @param userAgent Client identifier, takes precedence over headers
     * @param xUserAgent Client identifier, takes precedence over User-Agent
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postUiOpenwindowNewmail(newMail: PostUiOpenwindowNewmailNewMail, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postUiOpenwindowNewmail(newMail: PostUiOpenwindowNewmailNewMail, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postUiOpenwindowNewmail(newMail: PostUiOpenwindowNewmailNewMail, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postUiOpenwindowNewmail(newMail: PostUiOpenwindowNewmailNewMail, datasource?: 'tranquility' | 'singularity', token?: string, userAgent?: string, xUserAgent?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (newMail === null || newMail === undefined) {
            throw new Error('Required parameter newMail was null or undefined when calling postUiOpenwindowNewmail.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (datasource !== undefined) {
            queryParameters = queryParameters.set('datasource', <any>datasource);
        }
        if (token !== undefined) {
            queryParameters = queryParameters.set('token', <any>token);
        }
        if (userAgent !== undefined) {
            queryParameters = queryParameters.set('user_agent', <any>userAgent);
        }

        let headers = this.defaultHeaders;
        if (xUserAgent !== undefined && xUserAgent !== null) {
            headers = headers.set('X-User-Agent', String(xUserAgent));
        }

        // authentication (evesso) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/ui/openwindow/newmail/`,
            newMail,
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
