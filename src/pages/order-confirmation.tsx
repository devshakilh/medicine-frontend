import { useRouter } from 'next/router';

const OrderConfirmation: React.FC = () => {
  const router = useRouter();
  const { orderId } = router.query; // Assuming you're passing the order ID via query params

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Thank You!</h1>
        <p className="text-lg mb-4">Your order has been successfully placed.</p>
        <p className="text-lg mb-4">Order ID: <span className="font-semibold">{orderId}</span></p>
        <p className="text-lg mb-4">You will receive an email confirmation with the details of your order shortly.</p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
