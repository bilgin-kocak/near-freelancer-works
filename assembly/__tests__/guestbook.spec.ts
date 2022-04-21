import { addGig, getGigs, changeValidityGig } from '../main';
import { PostedGig, gigs } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createGig(text: string, description: string): PostedGig {
  const newIndex = gigs.length as i32;
  return new PostedGig(newIndex, text, description);
}

const gig = createGig('NEAR Developer Needed','This is a sample gig');

describe('gig tests', () => {
  afterEach(() => {
    while(gigs.length > 0) {
      gigs.pop();
    }
  });

  it('adds a gig', () => {
    addGig('NEAR Developer Needed','This is a sample gig');
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
    addGig('NEAR Developer Needed','This is a sample gig');
    const gigAR = getGigs();
    expect(gigAR[0].premium).toStrictEqual(true,
      'should be premium'
    );
  });

  it('retrieves gig', () => {
    addGig('NEAR Developer Needed','This is a sample gig');
    const gigArr = getGigs();
    expect(gigArr.length).toBe(
      1,
      'should be one message'
    );
    expect(gigArr).toIncludeEqual(
      gig,
      'messages should include:\n' + gig.toJSON()
    );
  });

  it('only show the last 10 messages', () => {
    addGig('NEAR Developer Needed','This is a sample gig');
    const newGigs: PostedGig[] = [];
    for(let i: i32 = 0; i < 10; i++) {
      const text = 'message #' + i.toString();
      const description = 'This is a sample gig' + i.toString();
      newGigs.push(createGig(text, description));
      addGig(text, description);
    }
    const messages = getGigs();
    log(messages.slice(7, 10));
    expect(messages).toStrictEqual(
      newGigs,
      'should be the last ten messages'
    );
    expect(messages).not.toIncludeEqual(
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

    addGig('NEAR Developer Needed','This is a sample gig');
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});
