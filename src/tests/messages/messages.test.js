import messages from '../../messages';

describe('messages', () => {
  it('has English', () => {
    const actual = 'en' in messages;

    expect(actual).toEqual(true);
  });
  it('has Bulgarien', () => {
    const actual = 'bg' in messages;

    expect(actual).toEqual(true);
  });
  it('English and Bulgarien have the same keys', () => {
    const en = Object.keys(messages['en']);
    const bg = Object.keys(messages['bg']);

    expect(en).toEqual(bg);
  });
});