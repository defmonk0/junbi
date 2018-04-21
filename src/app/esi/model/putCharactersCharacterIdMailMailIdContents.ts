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
 * contents object
 */
export interface PutCharactersCharacterIdMailMailIdContents {
    /**
     * Whether the mail is flagged as read
     */
    read?: boolean;
    /**
     * Labels to assign to the mail. Pre-existing labels are unassigned.
     */
    labels?: Array<number>;
}
