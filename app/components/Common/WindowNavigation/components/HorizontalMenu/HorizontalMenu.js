// @flow
import React, { useState, useEffect } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlay, faThList, faDownload } from '@fortawesome/free-solid-svg-icons';
import Badge from '../../../Badge/Badge';
import styles from './HorizontalMenu.scss';
import logo from '../../../../../assets/images/logo.png';

export default props => {
  const isLocation = loc => {
    if (loc === props.location) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.main}>
      <ul className={styles.ul}>
        <li
          className={`${styles.li} ${
            isLocation('/home') ? styles.activeLink : null
          }`}
        >
          <Link to="/home" draggable="false" className={styles.a}>
            <FontAwesomeIcon icon={faHome} className={styles.i} />
            HOME
          </Link>
        </li>
        <li
          className={`${styles.li} ${
            isLocation('/dmanager') ? styles.activeLink : null
          }`}
        >
          <Link to="/dmanager" draggable="false" className={styles.a}>
            <FontAwesomeIcon icon={faPlay} className={styles.i} />
            INSTANCES
          </Link>
        </li>
        <li
          className={`${styles.li} ${
            isLocation('/curseModpackExplorerModal') ? styles.activeLink : null
          }`}
        >
          <Link
            to={{
              pathname: `/curseModpackExplorerModal/294669`,
              state: { modal: true },
            }}
            draggable="false"
            className={styles.a}
          >
            <FontAwesomeIcon icon={faDownload} className={styles.i} />
            OFFICIAL MODPACK
          </Link>
        </li>
      </ul>
    </div>
  );
};
