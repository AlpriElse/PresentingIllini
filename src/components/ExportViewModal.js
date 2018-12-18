import React from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button } from 'reactstrap'

class ExportViewModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen}>
          <ModalHeader toggle={this.props.toggle}>Export Data</ModalHeader>
          <ModalBody>


          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Hide</Button>
          </ModalFooter>
        </Modal>
      </div>

    )
  }
}

export default ExportViewModal

ExportViewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}
