import { addGig, getGigs, changeValidityGig, getAccountGigs } from '../main';
import { PostedGig, gigs } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createGig(text: string, description: string, price: string): PostedGig {
  const newIndex = gigs.length as i32;
  return new PostedGig(newIndex, text, description, price);
}

const gig = createGig('NEAR Developer Needed','This is a sample gig', '0.01');

describe('gig tests', () => {
  afterEach(() => {
    while(gigs.length > 0) {
      gigs.pop();
    }
  });

  it('adds a gig', () => {
    addGig('NEAR Developer Needed','This is a sample gig', '0.01');
    expect(gigs.length).toBe(
      1,
      'should only contain one gig'
    );
    expect(gigs[0]).toStrictEqual(
      gig,
      'message should be gig'
    );
  });

  it('adds a premium gig', () => {
    VMContext.setAttached_deposit(u128.from('10000000000000000000000'));
    addGig('NEAR Developer Needed','This is a sample gig', '0.01');
    const gigAR = getGigs();
    expect(gigAR[0].premium).toStrictEqual(true,
      'should be premium'
    );
  });

  it('retrieves gig', () => {
    addGig('NEAR Developer Needed','This is a sample gig', '0.01');
    const gigArr = getGigs();
    expect(gigArr.length).toBe(
      1,
      'should be one message'
    );
    expect(gigArr).toIncludeEqual(
      gig,
      'gigs should include:\n' + gig.toJSON()
    );
  });

  it('only show the last 10 gigs', () => {
    addGig('NEAR Developer Needed','This is a sample gig', '0.01');
    const newGigs: PostedGig[] = [];
    for(let i: i32 = 0; i < 10; i++) {
      const text = 'message #' + i.toString();
      const description = 'This is a sample gig' + i.toString();
      const price = '0.01';
      newGigs.push(createGig(text, description, price));
      addGig(text, description, price);
    }
    const gigs = getGigs();
    log(gigs.slice(7, 10));
    expect(gigs).toStrictEqual(
      newGigs,
      'should be the last ten gigs'
    );
    expect(gigs).not.toIncludeEqual(
      gig,
      'shouldn\'t contain the first element'
    );
  });
});

describe('attached deposit tests', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(u128.fromString('0'));
    VMContext.setAccount_balance(u128.fromString('0'));
  });

  it('attaches a deposit to a contract call', () => {
    log('Initial account balance: ' + Context.accountBalance.toString());

    addGig('NEAR Developer Needed','This is a sample gig', '0.01');
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});

describe('change validity', () => {
  afterEach(() => {
    while(gigs.length > 0) {
      gigs.pop();
    }
  });
  it('change validity of gig', () => {
    addGig('NEAR Developer Needed','This is a sample gig', '0.01');
    const initialValidity: bool = gigs[0].isValid;
    changeValidityGig(0);
    const finalValidity: bool = gigs[0].isValid;
    const accountId = "bob";
    const gigArr = getAccountGigs(accountId);
    log(gigArr);
    expect(gigs[0].isValid).toBe(
      false,
      'validity should be changed'
    );
  });
});

describe('getting my gigs', () => {
  afterEach(() => {
    while(gigs.length > 0) {
      gigs.pop();
    }
  });
  it('get my gigs', () => {
    log(gigs.length);
    log(gigs);
    addGig('NEAR Developer Needed','This is a sample gig', '0.01');
    const accountId: string = "bob";
    const gigArr = getAccountGigs(accountId);
    log(gigArr);
    log(gigs[0].sender)
    expect(gigArr.length).toBe(
      1,
      'should only gig of bob'
    );
  });
});