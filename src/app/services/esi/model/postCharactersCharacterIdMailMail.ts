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
import { PostCharactersCharacterIdMailRecipient } from './postCharactersCharacterIdMailRecipient';


/**
 * mail object
 */
export interface PostCharactersCharacterIdMailMail {
    /**
     * recipients array
     */
    recipients: Array<PostCharactersCharacterIdMailRecipient>;
    /**
     * subject string
     */
    subject: string;
    /**
     * body string
     */
    body: string;
    /**
     * approved_cost integer
     */
    approvedCost?: number;
}