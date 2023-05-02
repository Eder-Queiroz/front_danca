import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";

export default function Feedback(props: any) {
  useEffect(() => {
    if (props.modal) {
      setTimeout(() => props.toggle(), 5000);
    }
  }, [props.modal]);

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} centered>
        <ModalHeader>{props.menssage && props.menssage}</ModalHeader>
        <ModalBody className="d-flex justify-content-center">
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "4rem" }}
          ></i>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
