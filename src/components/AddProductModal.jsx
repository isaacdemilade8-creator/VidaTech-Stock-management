import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function AddProductModal({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    setImage(reader.result);
  };

  reader.readAsDataURL(file);
};



  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) return alert("Fill all fields");

    onAdd({
      id: Date.now(),
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      category: category || "General",
      image,
    });

    setName("");
    setQuantity("");
    setPrice("");
    setImage("");
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="mb-6 bg-primary py-2 px-4 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
      >
        + Add New Product
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-xl shadow-xl w-full max-w-sm md:max-w-md p-4 md:p-6 max-h-[90vh] overflow-y-auto">
                <Dialog.Title className="text-xl md:text-2xl font-bold mb-4">
                  Add New Product
                </Dialog.Title>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    placeholder="Quantity"
                    className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category / Tag"
                    className="w-full p-2 md:p-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-xs md:text-sm cursor-pointer"
                  />

                  <div className="mt-4 flex justify-end gap-2">
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
                      Add
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}