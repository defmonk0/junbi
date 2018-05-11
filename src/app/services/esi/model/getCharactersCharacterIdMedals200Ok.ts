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
import { GetCharactersCharacterIdMedalsGraphic } from './getCharactersCharacterIdMedalsGraphic';


/**
 * 200 ok object
 */
export interface GetCharactersCharacterIdMedals200Ok {
    /**
     * medal_id integer
     */
    medalId: number;
    /**
     * title string
     */
    title: string;
    /**
     * description string
     */
    description: string;
    /**
     * corporation_id integer
     */
    corporationId: number;
    /**
     * issuer_id integer
     */
    issuerId: number;
    /**
     * date string
     */
    date: Date;
    /**
     * reason string
     */
    reason: string;
    /**
     * status string
     */
    status: GetCharactersCharacterIdMedals200Ok.StatusEnum;
    /**
     * graphics array
     */
    graphics: Array<GetCharactersCharacterIdMedalsGraphic>;
}
export namespace GetCharactersCharacterIdMedals200Ok {
    export type StatusEnum = 'public' | 'private';
    export const StatusEnum = {
        Public: 'public' as StatusEnum,
        Private: 'private' as StatusEnum
    }
}
