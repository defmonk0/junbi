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
 * 200 ok object
 */
export interface GetCorporationCorporationIdMiningExtractions200Ok {
    /**
     * structure_id integer
     */
    structureId: number;
    /**
     * moon_id integer
     */
    moonId: number;
    /**
     * The time at which the current extraction was initiated. 
     */
    extractionStartTime: Date;
    /**
     * The time at which the chunk being extracted will arrive and can be fractured by the moon mining drill. 
     */
    chunkArrivalTime: Date;
    /**
     * The time at which the chunk being extracted will naturally fracture if it is not first fractured by the moon mining drill. 
     */
    naturalDecayTime: Date;
}
