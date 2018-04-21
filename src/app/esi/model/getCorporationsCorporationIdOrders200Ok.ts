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
export interface GetCorporationsCorporationIdOrders200Ok {
    /**
     * Unique order ID
     */
    orderId: number;
    /**
     * The type ID of the item transacted in this order
     */
    typeId: number;
    /**
     * ID of the region where order was placed
     */
    regionId: number;
    /**
     * ID of the location where order was placed
     */
    locationId: number;
    /**
     * Valid order range, numbers are ranges in jumps
     */
    range: GetCorporationsCorporationIdOrders200Ok.RangeEnum;
    /**
     * Cost per unit for this order
     */
    price: number;
    /**
     * Quantity of items required or offered at time order was placed
     */
    volumeTotal: number;
    /**
     * Quantity of items still required or offered
     */
    volumeRemain: number;
    /**
     * Date and time when this order was issued
     */
    issued: Date;
    /**
     * True if the order is a bid (buy) order
     */
    isBuyOrder?: boolean;
    /**
     * For buy orders, the minimum quantity that will be accepted in a matching sell order
     */
    minVolume?: number;
    /**
     * For buy orders, the amount of ISK in escrow
     */
    escrow?: number;
    /**
     * Number of days for which order is valid (starting from the issued date). An order expires at time issued + duration
     */
    duration: number;
    /**
     * The corporation wallet division used for this order.
     */
    walletDivision: number;
}
export namespace GetCorporationsCorporationIdOrders200Ok {
    export type RangeEnum = '1' | '10' | '2' | '20' | '3' | '30' | '4' | '40' | '5' | 'region' | 'solarsystem' | 'station';
    export const RangeEnum = {
        _1: '1' as RangeEnum,
        _10: '10' as RangeEnum,
        _2: '2' as RangeEnum,
        _20: '20' as RangeEnum,
        _3: '3' as RangeEnum,
        _30: '30' as RangeEnum,
        _4: '4' as RangeEnum,
        _40: '40' as RangeEnum,
        _5: '5' as RangeEnum,
        Region: 'region' as RangeEnum,
        Solarsystem: 'solarsystem' as RangeEnum,
        Station: 'station' as RangeEnum
    }
}
