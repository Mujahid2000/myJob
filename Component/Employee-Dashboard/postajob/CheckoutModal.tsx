'use client';
import { useState } from 'react';
import Image from 'next/image';
import { CreditCard, MoveRight, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCaptureOrderMutation, useCreateOrderMutation } from '@/RTKQuery/paymentApi';
import { useToast } from '@/Component/Toast/ToastNotification';


interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [selectedCard, setSelectedCard] = useState<string>('saved');
  const [error, setError] = useState<string | null>(null);
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const [captureOrder, { isLoading: isCapturingOrder }] = useCaptureOrderMutation();
  const [modal, isModal] = useState<boolean>(false)
  const router = useRouter();
  const { price, duration, packageName, userId } = useSelector((state: RootState) => state.subscription);
  const { addToast } = useToast();
  const [newCard, setNewCard] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });


  const handleClose = (data:boolean) =>{
    isModal(!data)
  }

  // Validate required fields before proceeding
  if (!price || !userId || !packageName || !duration) {
    return (
      <div className={`${modal===false? 'hidden' : 'block'} fixed top-0 left-0 w-full h-screen z-[200000000] bg-[#0000002a] flex items-center justify-center`}>
        <div className="bg-white max-w-7xl rounded-lg shadow-xl p-6 relative">
          <button
            onClick={()=>handleClose(false)}
            className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Error</h2>
          <p className="text-red-500">Missing required subscription details. Please select a plan first.</p>
        </div>
      </div>
    );
  }

  // Validate PayPal clientId
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) {
    return (
      <div className="fixed top-0 left-0 w-full h-screen z-[200000000] bg-[#0000002a] flex items-center justify-center">
        <div className="bg-white max-w-7xl rounded-lg shadow-xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Error</h2>
          <p className="text-red-500">PayPal client ID is not configured. Please contact support.</p>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const createOrderHandler = async () => {
    try {
      // Format price to two decimal places for PayPal
      const formattedPrice = Number(price).toFixed(2);
      const response = await createOrder({ price: formattedPrice, userId, packageName, duration }).unwrap();
      return response.orderID;
    } catch (err: any) {
      const errorMessage = err.data?.message || 'Failed to create order';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      throw new Error(errorMessage);
    }
  };

  const onApprove = async (data: any) => {
    try {
      // Format price to two decimal places for consistency
      const formattedPrice = Number(price).toFixed(2);
      await captureOrder({ orderID: data.orderID, userId, packageName, duration, price: formattedPrice }).unwrap();
      addToast('Payment successful!', 'success');
      onClose();
      router.push('/payments/success');
    } catch (err: any) {
      const errorMessage = err.data?.message || 'Payment failed';
      setError(errorMessage);
      addToast(errorMessage, 'error');
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <div
        className={`${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-opacity duration-300 flex items-center justify-center`}
      >
        <div
          className={`${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          } max-w-full rounded-lg transition-all duration-300 mx-auto mt-8`}
        >
          <div className="bg-white max-w-7xl rounded-lg shadow-xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Checkout</h2>
            <hr className="mb-6" />

            <div className="flex flex-col md:flex-row gap-2">
              {/* Payment System Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment System</h3>
                <div className="flex gap-4 mb-6">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg ${
                      selectedCard === 'saved' ? 'border-b-2 border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedCard('saved')}
                  >
                    <CreditCard size={16} />
                    Debit/Credit Card
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg ${
                      selectedCard === 'paypal' ? 'border-b-2 border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedCard('paypal')}
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/0/0e/PayPal_2024_(Icon).svg"
                      alt="PayPal Logo"
                      width={16}
                      height={16}
                    />
                    PayPal
                  </button>
                </div>

                {/* Saved Card */}
                {selectedCard === 'paypal' ? (
                  <div className="mb-4">
                    <PayPalButtons
                      createOrder={createOrderHandler}
                      onApprove={onApprove}
                      disabled={isCreatingOrder || isCapturingOrder}
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  </div>
                ) : (
                  <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg mb-4 w-full">
                    <input
                      type="radio"
                      checked={selectedCard === 'saved'}
                      onChange={() => setSelectedCard('saved')}
                      className="h-5 w-5 text-blue-500"
                    />
                    <Image
                      src="https://static-00.iconduck.com/assets.00/mastercard-icon-1024x793-xinze39n.png"
                      alt="Mastercard"
                      width={32}
                      height={24}
                    />
                    <div className="flex gap-4 justify-between w-full">
                      <div>
                        <p className="text-gray-900 text-[12px]">Card Number</p>
                        <p className="text-gray-500 text-[12px]">5347 **** **** ****</p>
                      </div>
                      <div>
                        <p className="text-gray-900 text-[12px]">Name on Card</p>
                        <p className="text-gray-500 text-[12px]">Esther Howard</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* New Payment Card */}
                <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg mb-4 w-full">
                  <input
                    type="radio"
                    checked={selectedCard === 'new'}
                    onChange={() => setSelectedCard('new')}
                    className="h-4 w-4 text-blue-500"
                  />
                  <p className="text-gray-900">New payment card</p>
                </div>

                {selectedCard === 'new' && (
                  <div className="space-y-4 w-full">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newCard.name}
                        onChange={handleInputChange}
                        className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                        placeholder="Name"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="payment" className="block text-sm mb-2">Credit Card</label>
                      <div className="flex border rounded-lg">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={newCard.cardNumber}
                          onChange={handleInputChange}
                          className="w-5/6 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none"
                          placeholder="Card Number"
                        />
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={newCard.expiry}
                          onChange={handleInputChange}
                          className="w-1/6 inline-block text-sm bg-grey-light text-grey-darkest p-3 focus:outline-none"
                          placeholder="MM / YY"
                        />
                        <input
                          type="text"
                          id="cvc"
                          name="cvc"
                          value={newCard.cvc}
                          onChange={handleInputChange}
                          className="w-1/6 inline-block text-sm bg-grey-light text-grey-darkest rounded-r p-3 focus:outline-none"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary Section */}
              <div className="p-2 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
                <div className="flex text-sm justify-between gap-2 text-gray-600 mb-2">
                  <span>Pricing Plans: {packageName}</span>
                  <span>${Number(price).toFixed(2)}</span>
                </div>
                <div className="flex gap-5 justify-between font-semibold text-gray-900 border-t border-gray-200 pt-2">
                  <span>TOTAL:</span>
                  <span>${Number(price).toFixed(2)}</span>
                </div>
                <Link href={'/company-dashboard/post-job'}>
                  <button className="mt-6 flex cursor-pointer items-center justify-evenly w-full bg-[#0A65CC] text-white py-3 rounded-sm font-semibold hover:bg-blue-600">
                    Choose Plan <MoveRight />
                  </button>
                </Link>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  This package will expire after one month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default CheckoutModal;