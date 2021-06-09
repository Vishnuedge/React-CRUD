import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ViewModal(props) {
  const { isOpen, toggle, data } = props;
  console.log(data);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>COMMENTS</ModalHeader>
      <ModalBody>
        {data.map(comment => {
          return (
            <div>
              <div>
                <h5>@ Name :</h5> {comment.name}
              </div>
              <div>
                <h5>Comment :</h5> {comment.body}
                <hr />
              </div>
            </div>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            toggle();
          }}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ViewModal;
