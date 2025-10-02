import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ReplaceCartModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Replace Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You already have items from another restaurant in your cart. Would you like to replace them with items from this restaurant?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Replace Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReplaceCartModal;
