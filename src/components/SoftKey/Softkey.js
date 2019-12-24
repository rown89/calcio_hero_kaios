import React, { useContext, useEffect } from 'react';
import { NavigationContext } from 'react-keyboard-navigation';
import css from './SoftKey.scss';

export const Softkey = ({
  left,
  onKeyLeft,
  center,
  onKeyCenter,
  right,
  onKeyRight
}) => {
  const { state } = useContext(NavigationContext);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleKeyDown = evt => {
    switch (evt.key) {
      case 'SoftLeft':
        console.log(evt.key)
        return onKeyLeft && onKeyLeft(evt);
      case 'Enter':
        return onKeyCenter && onKeyCenter(evt);
      case 'SoftRight':
      case 'ArrowRight':
        return onKeyRight && onKeyRight(evt);
      default:
        return;
    }
  };

  return (
    <div className={css.softkey}>
      <label className={css.left}>{left}</label>
      <label className={css.center}>{center}</label>
      <label className={css.right}>{right}</label>
    </div>
  );
};
