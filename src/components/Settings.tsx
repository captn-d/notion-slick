import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { ENABLE_TOC_SETTING, HIDE_ASK_AI_BUTTON_SETTING, DISABLE_AI_ON_SPACE_PRESS_SETTING } from 'src/constants/strings';
import FlagSetting from 'src/components/FlagSetting';
// import type { FC } from 'react';

interface StyleProps {
}

const useStyles = createUseStyles<string, StyleProps>({

	settings: {
		// width: 200,
		paddingTop: 5,
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 0,
	},

	version: {
		textAlign: 'center',
	},
});


const Settings = () => {
	const classes = useStyles();
	const [version, setVersion] = useState('');
	useEffect(() => {
		// Get the manifest using the Chrome runtime API
		const manifest = chrome.runtime.getManifest();
		// Set the version from the manifest
		setVersion(manifest.version);
	}, []);

	return (
		<div className={classes.settings}>
			<FlagSetting name="Enable table of Contents" _key={ENABLE_TOC_SETTING} defaultValue={true} />
			<FlagSetting name="Hide Ask AI button" _key={HIDE_ASK_AI_BUTTON_SETTING} defaultValue={true} />
			<FlagSetting name="Disable AI popup on space press" _key={DISABLE_AI_ON_SPACE_PRESS_SETTING} defaultValue={true} />
			<hr/>
			<p className={classes.version}>Version: {version}</p>
		</div>
	);
};

const MemoizedSetting = React.memo(Settings);
export default MemoizedSetting;
