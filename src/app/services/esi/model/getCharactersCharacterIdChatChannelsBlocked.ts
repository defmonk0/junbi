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
 * blocked object
 */
export interface GetCharactersCharacterIdChatChannelsBlocked {
    /**
     * ID of a blocked channel member
     */
    accessorId: number;
    /**
     * accessor_type string
     */
    accessorType: GetCharactersCharacterIdChatChannelsBlocked.AccessorTypeEnum;
    /**
     * Reason this accessor is blocked
     */
    reason?: string;
    /**
     * Time at which this accessor will no longer be blocked
     */
    endAt?: Date;
}
export namespace GetCharactersCharacterIdChatChannelsBlocked {
    export type AccessorTypeEnum = 'character' | 'corporation' | 'alliance';
    export const AccessorTypeEnum = {
        Character: 'character' as AccessorTypeEnum,
        Corporation: 'corporation' as AccessorTypeEnum,
        Alliance: 'alliance' as AccessorTypeEnum
    }
}