import React from 'react';
import { useField } from 'formik';
import cx from 'classnames';
import styles from './_textInput.module.scss';

export default function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  let input = null;

  const onScroll = () => {
    input.blur(); // to disabled increase/decrease inside [type=number]
  };

  return (
    <div className={styles['text-input']}>
      <div>
        {label && <label className={styles['label']}>{label}</label>}
        <input
          ref={(ref) => (input = ref)}
          onWheel={onScroll}
          className={cx(styles['input'], props.inputClassName)}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && !props?.isCustomError ? (
          <div className={styles['error']}>{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
}
