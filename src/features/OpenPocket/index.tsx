import * as React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import pocketModule from '../pocketModule';

const OpenPocket: React.FC = () => {
  const dispatch = useDispatch();

  const handleOpenPocket = () => {
    dispatch(pocketModule.actions.openPocket());
  };
  return (
    <div className="open-pocket">
      <Button onClick={handleOpenPocket}>open</Button>
    </div>
  );
};

export default OpenPocket;
