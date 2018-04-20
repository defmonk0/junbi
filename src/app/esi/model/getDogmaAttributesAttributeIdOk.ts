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
export interface GetDogmaAttributesAttributeIdOk { 
    /**
     * attribute_id integer
     */
    attributeId: number;
    /**
     * name string
     */
    name?: string;
    /**
     * description string
     */
    description?: string;
    /**
     * icon_id integer
     */
    iconId?: number;
    /**
     * default_value number
     */
    defaultValue?: number;
    /**
     * published boolean
     */
    published?: boolean;
    /**
     * display_name string
     */
    displayName?: string;
    /**
     * unit_id integer
     */
    unitId?: number;
    /**
     * stackable boolean
     */
    stackable?: boolean;
    /**
     * high_is_good boolean
     */
    highIsGood?: boolean;
}