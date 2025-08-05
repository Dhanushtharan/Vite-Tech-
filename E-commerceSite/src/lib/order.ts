//order

export async function createOrder(orderData: any) {
  try {
    const res = await fetch('https://688875f3adf0e59551ba09c8.mockapi.io/Orderdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      throw new Error('Failed to place order');
    }

    return await res.json();
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
}
