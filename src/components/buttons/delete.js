import React from 'react';
import PropTypes from 'prop-types';
import Popconfirm from 'antd/lib/popconfirm';

const DeleteButton = ({element, handleClick, darkBorder}) =>{
  return (
      <Popconfirm title={`Are you sure?`}
                  okText="Yes"
                  onConfirm={handleClick}
                  overlayClassName="popover"
                  arrowPointAtCenter={true}
                  cancelText="No">
        <button className={`component btn btn__delete ${darkBorder && "btn__darkBorder"}`}>Delete {element}</button>
      </Popconfirm>
  )
};

export default DeleteButton;

DeleteButton.propTypes = {
  element: PropTypes.string.isRequired
};