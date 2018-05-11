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
export interface PostUniverseNames200Ok {
    /**
     * id integer
     */
    id: number;
    /**
     * name string
     */
    name: string;
    /**
     * category string
     */
    category: PostUniverseNames200Ok.CategoryEnum;
}
export namespace PostUniverseNames200Ok {
    export type CategoryEnum = 'alliance' | 'character' | 'constellation' | 'corporation' | 'inventory_type' | 'region' | 'solar_system' | 'station';
    export const CategoryEnum = {
        Alliance: 'alliance' as CategoryEnum,
        Character: 'character' as CategoryEnum,
        Constellation: 'constellation' as CategoryEnum,
        Corporation: 'corporation' as CategoryEnum,
        InventoryType: 'inventory_type' as CategoryEnum,
        Region: 'region' as CategoryEnum,
        SolarSystem: 'solar_system' as CategoryEnum,
        Station: 'station' as CategoryEnum
    }
}
