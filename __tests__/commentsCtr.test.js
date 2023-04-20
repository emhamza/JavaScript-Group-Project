import commentsCounter from '../src/modules/counter/commentsCtr.js';

describe('commentsCounter', () => {
  beforeEach(() => {
    const localStorageMock = (() => {
      let store = {};

      return {
        getItem: jest.fn((key) => store[key]),
        setItem: jest.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: jest.fn(() => {
          store = {};
        }),
        removeItem: jest.fn((key) => {
          delete store[key];
        }),
      };
    })();

    global.localStorage = localStorageMock;
    localStorage.clear();
  });

  it('should return 0 for a post with no comments', async () => {
    // Set up the localStorage
    localStorage.setItem('1comments', JSON.stringify([]));

    // Call the function
    const count = await commentsCounter(1);

    // Assert the result
    expect(count).toEqual(0);
  });

  it('should return the correct count for a post with comments', async () => {
    // Set up the localStorage
    localStorage.setItem('2comments', JSON.stringify([{ author: 'John', text: 'Test comment' }, { author: 'Jane', text: 'Another comment' }]));

    // Call the function
    const count = await commentsCounter(2);

    // Assert the result
    expect(count).toEqual(2);
  });
});
