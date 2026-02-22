import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function EditProductModal({ product, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [category, setCategory] = useState(product.category || "");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      ...product,
      name,
      price: Number(price),
      quantity: Number(quantity),
      category,
    });

    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="w-full border border-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-100"
      >
        Edit
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-xl p-4 md:p-6 w-full max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto">
              <Dialog.Title className="text-lg md:text-xl font-bold mb-4">
                Edit Product
              </Dialog.Title>

              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Product name"
                />
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Price"
                />
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Quantity"
                />
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Category"
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg border rounded-md shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:border-2 hover:border-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-br from-rose-200 via-fuchsia-400 to-indigo-300 rounded-md text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:border-2 hover:border-red-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
