import mealDishesCounter from './itemCtr.js';

describe('mealDishesCounter', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // create a mock fetch function
  });

  afterEach(() => {
    jest.resetAllMocks(); // reset all mock functions after each test
  });

  test('should display the correct item count when a successful response is returned', async () => {
    const mockData = {
      categories: ['category1', 'category2', 'category3'],
    };
    global.fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });
    await mealDishesCounter();
    expect(document.getElementById('itemCount').textContent).toBe('3');
  });

  test('should display 0 when empty JSON data is returned', async () => {
    global.fetch.mockResolvedValueOnce({ json: () => Promise.resolve({ categories: [] }) });
    await mealDishesCounter();
    expect(document.getElementById('itemCount').textContent).toBe('0');
  });

  test('should display an error message when the API returns an error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API is down'));
    await mealDishesCounter();
    expect(document.getElementById('itemCount').textContent).toBe('Error: API is down');
  });

  test('should display an error message when the JSON data is malformed', async () => {
    global.fetch.mockResolvedValueOnce({ json: () => Promise.reject(new Error('Malformed data')) });
    await mealDishesCounter();
    expect(document.getElementById('itemCount').textContent).toBe('Error: Malformed data');
  });
});
