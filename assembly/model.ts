import { context, u128, PersistentVector } from "near-sdk-as";

/** 
 * Exporting a new class PostedGig so it can be used outside of this file.
 */
@nearBindgen
export class PostedGig {
  premium: boolean;
  sender: string;
  isValid: boolean;
  description: string;
  gigId: i32;
  price: string;
  constructor(gigId: i32, public text: string, public gigDesc: string, price: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
    this.isValid = true;
    this.description = gigDesc;
    this.gigId = gigId;
    this.price = price;
  }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const gigs = new PersistentVector<PostedGig>("a");
