import mealDishesCounter from '../src/modules/counter/itemCtr.js';

describe('mealDishesCounter', () => {
  it('should display the correct number of meal dishes', async () => {
    const categories = [{ name: 'Breakfast' }, { name: 'Lunch' }, { name: 'Dinner' }];

    const response = { json: () => ({ categories }) };
    global.fetch = jest.fn().mockResolvedValue(response);

    document.body.innerHTML = '<div id="itemCount"></div>';

    await mealDishesCounter();

    const itemCount = document.getElementById('itemCount');
    const expectedItemCount = categories.length;

    expect(itemCount.innerText).toBe(expectedItemCount);
  });

  it('should handle errors during data fetching', async () => {
    const error = new Error('Failed to fetch data');
    global.fetch = jest.fn().mockRejectedValue(error);

    console.error = jest.fn();

    await mealDishesCounter();

    expect(console.error).toHaveBeenCalledWith('An error occurred while fetching data:', error);
  });

  it('should handle missing element with ID "itemCount"', async () => {
    const categories = [{ name: 'Breakfast' }, { name: 'Lunch' }, { name: 'Dinner' }];

    const response = { json: () => ({ categories }) };
    global.fetch = jest.fn().mockResolvedValue(response);

    console.error = jest.fn();

    await mealDishesCounter();

    setTimeout(() => {
      expect(console.error).toHaveBeenCalledWith('Could not find element with ID "itemCount"');
    }, 1000);
  });
});
