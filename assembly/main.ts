import { context } from 'near-sdk-as';
import { PostedGig, gigs } from './model';

// --- contract code goes below

// The maximum number of latest gigs the contract returns.
const GIG_LIMIT = 10;

/**
 * Adds a new gig work under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addGig(text: string, description: string, price: string): void {
  assert(parseFloat(price) > 0, 'Price must be greater than 0');
  // Creating a new gig and populating fields with our data
  const newIndex = gigs.length as i32;
  const gig = new PostedGig(newIndex, text, description, price);
  // Adding the gig to end of the persistent collection
  gigs.push(gig);
}

/**
 * Adds a new gig work under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
 export function changeValidityGig(gigId: i32): void {
  assert(gigs.length > gigId, 'gigId is out of range');
  // Getting the gig from the persistent collection
  let gig = gigs[gigId];
  // Change validity of the gig
  gig.isValid = !gig.isValid;
  // Updating the gig in the persistent collection
  gigs.replace(gigId, gig);
}

/**
 * Adds a new gig work under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
 export function getAccountGigs(accountId: string):  PostedGig[] {
  // Getting the my gig from the persistent collection
  const numGigs = min(GIG_LIMIT, gigs.length);
  const result = new Array<PostedGig>(numGigs);
  let j = 0;
  for(let i = gigs.length -1; i >= 0 ; i--) {
    if (gigs[i].sender == accountId) {
      result[j] = gigs[i];
      j++;
      if (j === numGigs) {
        break;
      }
    }
  }
  const result_ = new Array<PostedGig>(result.length);
  for (let i = 0; i < result.length; i++) {
    result_[i] = result[result.length - i - 1];
  }
  return result_;
}

/**
 * Returns an array of last N gigs.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getGigs(): PostedGig[] {
  const numGigs = min(GIG_LIMIT, gigs.length);
  const startIndex = gigs.length - numGigs;
  const result = new Array<PostedGig>(numGigs);
  let j = 0;
  for(let i = 0; i < gigs.length; i++) {
    
    result[j] = gigs[i + startIndex];
    j ++;
   
    if (j === numGigs) {
      break;
    }
  }
  return result;
}
