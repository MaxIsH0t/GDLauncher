import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button, message, Input, Icon } from 'antd';
import fsa from 'fs-extra';
import path from 'path';
import styles from './Instances.scss';
import { INSTANCES_PATH, META_PATH } from '../../../../constants';
import SettingCard from '../SettingCard/SettingCard';
import Title from '../Title/Title';
import SwitchSetting from '../SwitchSetting/SwitchSetting';
import ButtonSetting from '../ButtonSetting/ButtonSetting';
import { setInstancesPath } from '../../../../actions/settings';

function Instances(props) {
  const [deletingInstances, setDeletingInstances] = useState(false);

  async function deleteShareData() {
    try {
      setDeletingInstances(true);
      await fsa.emptyDir(path.join(INSTANCES_PATH, 'libraries'));
      await fsa.emptyDir(path.join(INSTANCES_PATH, 'packs'));
      await fsa.emptyDir(path.join(INSTANCES_PATH, 'assets'));
      await fsa.emptyDir(path.join(INSTANCES_PATH, 'versions'));
      await fsa.emptyDir(path.join(INSTANCES_PATH, 'temp'));
      await fsa.emptyDir(META_PATH);
      setDeletingInstances(false);
      message.success('Data has been cleared.');
    } catch (e) {
      message.error('Error while clearing data.');
    }
  }

  const openFolderDialog = () => {
    const { dialog } = require('electron').remote;
    dialog.showOpenDialog(
      {
        properties: ['openDirectory'],
        defaultPath: path.dirname(props.instancesPath)
      },
      paths => {
        props.setInstancesPath(paths[0]);
      }
    );
  };

  const restartLauncher = () => {
    const remote = require('electron').remote;
    remote.app.relaunch();
    remote.app.exit(0);
  };

  return (
    <div>
      <Title>Instances</Title>
      <SettingCard>
        <ButtonSetting
          mainText="Clear Shared Data"
          description="Deletes all the shared files between instances. Doing this will result in the complete loss of the instances data"
          icon="delete"
          onClick={() => deleteShareData()}
          disabled={props.installing !== null}
          loading={deletingInstances}
          btnText="Clear"
        />
      </SettingCard>
      <SwitchSetting
        mainText="Override Default Instances Path"
        description={<div>
          <div>If enabled, instances will be downloaded in the selected path</div>
          <div className={styles.restart}>
            You need to{' '}
            <span style={{ color: 'white', cursor: 'pointer' }} onClick={restartLauncher}>restart</span>{' '}
            the launcher for this setting to apply
          </div>
        </div>}
        icon="folder"
        checked={props.instancesPath}
        onChange={e => props.setInstancesPath(e ? INSTANCES_PATH : null)}
      />
      {props.instancesPath && (
        <div>
          <div>
            <span style={{ fontSize: 18 }}>Instances Custom Path</span>
            <Input
              value={props.instancesPath}
              size="large"
              style={{
                width: '90%',
                display: 'inline-block',
                height: '60px',
                marginBottom: '10px !important',
                marginTop: '4px !important'
              }}
              prefix={
                <Icon
                  type="folder"
                  theme="filled"
                  style={{ color: 'rgba(255,255,255,.8)' }}
                />
              }
              onChange={e => props.setInstancesPath(e.target.value)}
            />
            <Button
              type="primary"
              icon="folder"
              theme="filled"
              onClick={openFolderDialog}
              style={{ height: 60, marginLeft: 10, marginBottom: 10, marginTop: 4 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    installing: state.downloadManager.actualDownload,
    instancesPath: state.settings.instancesPath
  };
}

const mapDispatchToProps = {
  setInstancesPath
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instances);
