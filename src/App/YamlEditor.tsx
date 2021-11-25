import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/yaml/yaml';

import { css } from '@emotion/css';
import { IconButton, Tooltip, withStyles } from '@material-ui/core';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import { Controlled as ControlledCodeMirror, IControlledCodeMirror } from 'react-codemirror2';

import { createUseClasses } from '../utils/createUseClasses';
import { emptyObject } from '../utils/utils';
import { formatYaml, isYamlValid } from './appSlice/getValidationResult';

interface Props extends IControlledCodeMirror {
  setValue: (value: string) => void;
}

export function YamlEditor(props: Props) {
  const classes = useClasses(emptyObject);
  const isFormattingDisabled = !isYamlValid(props.value);

  const format = () => {
    const source = props.value;
    const formatted = formatYaml(source);
    props.setValue(formatted);
  };

  return (
    <div className={classes.yamlEditorWrapper}>
      <ControlledCodeMirror
        {...props}
        options={{ lineNumbers: true, tabSize: 2, mode: 'yaml', ...props.options }}
        className={props.className ? `${props.className} ${classes.yamlEditorRoot}` : classes.yamlEditorRoot}
      />
      <PrettierFormatTooltip title="Format">
        <IconButton className={classes.formatButton} onClick={format} disabled={isFormattingDisabled}>
          <FormatIndentIncreaseIcon fontSize="large" />
        </IconButton>
      </PrettierFormatTooltip>
    </div>
  );
}

const useClasses = createUseClasses((props) => ({
  yamlEditorRoot: css`
    width: 100%;
    height: 100%;
    .CodeMirror {
      min-height: 100%;
    }
  `,
  yamlEditorWrapper: css`
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid silver;
  `,
  formatButton: css`
    position: absolute !important;
    bottom: 50px;
    right: 50px;
    z-index: 100;
    border: 1px solid lightgray !important;
    border-radius: 0 !important;
    padding: 0.3rem !important;
  `,
}));

const PrettierFormatTooltip = withStyles({
  tooltip: {
    background: 'lightgray',
    color: 'black',
    fontSize: '0.8rem',
  },
})(Tooltip);
