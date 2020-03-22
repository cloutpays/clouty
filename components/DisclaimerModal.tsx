import classnames from 'classnames';
import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import { styles } from '../constants/styles';

const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpenModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='flex justify-center'>
      <button
        className='b ph3 pv2 link input-reset ba b--gray bg-transparent grow pointer f6 dib'
        onClick={onOpenModal}>
        <span className='gray'>Credit Disclosure</span>
      </button>
      <Modal open={isOpen} onClose={onCloseModal} center={true}>
        <h2 className={styles.h2}>Credit Disclosure</h2>
        <p className={classnames(styles.paragraph, 'i')}>
          The $2 credit is only for betting and can't be cashed out. Winnings
          earned from this credit can be redeemed for cash.
        </p>
      </Modal>
    </div>
  );
};

export default DisclaimerModal;
