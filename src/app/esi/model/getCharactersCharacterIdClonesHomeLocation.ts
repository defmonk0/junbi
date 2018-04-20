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


/**
 * home_location object
 */
export interface GetCharactersCharacterIdClonesHomeLocation { 
    /**
     * location_id integer
     */
    locationId?: number;
    /**
     * location_type string
     */
    locationType?: GetCharactersCharacterIdClonesHomeLocation.LocationTypeEnum;
}
export namespace GetCharactersCharacterIdClonesHomeLocation {
    export type LocationTypeEnum = 'station' | 'structure';
    export const LocationTypeEnum = {
        Station: 'station' as LocationTypeEnum,
        Structure: 'structure' as LocationTypeEnum
    };
}
