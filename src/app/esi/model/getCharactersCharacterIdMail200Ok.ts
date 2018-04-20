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
import { GetCharactersCharacterIdMailRecipient } from './getCharactersCharacterIdMailRecipient';


/**
 * 200 ok object
 */
export interface GetCharactersCharacterIdMail200Ok { 
    /**
     * mail_id integer
     */
    mailId?: number;
    /**
     * Mail subject
     */
    subject?: string;
    /**
     * From whom the mail was sent
     */
    from?: number;
    /**
     * When the mail was sent
     */
    timestamp?: Date;
    /**
     * labels array
     */
    labels?: Array<number>;
    /**
     * Recipients of the mail
     */
    recipients?: Array<GetCharactersCharacterIdMailRecipient>;
    /**
     * is_read boolean
     */
    isRead?: boolean;
}
