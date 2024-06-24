import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Modal</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const ModalHeader = ({ children }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold">{children}</h3>
  </div>
);

const ModalBody = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const ModalFooter = ({ children }) => (
  <div className="flex justify-end space-x-2">
    {children}
  </div>
);

export { Modal, ModalHeader, ModalBody, ModalFooter };
