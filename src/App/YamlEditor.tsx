import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/yaml-lint';

import { css } from '@emotion/css';
import { IconButton, Tooltip, withStyles } from '@material-ui/core';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import { Controlled as ControlledCodeMirror, IControlledCodeMirror } from 'react-codemirror2';

import { createUseClasses } from '../utils/createUseClasses';
import { emptyObject } from '../utils/utils';
import { formatYaml, isYamlValid } from './appSlice/getValidationResult';

// required by codemirror/addon/lint/yaml-lint
(window as any).jsyaml = require('js-yaml');

interface Props extends IControlledCodeMirror {
  setValue: (value: string) => void;
}

export function YamlEditor(props: Props) {
  const classes = useClasses(emptyObject);
  const isFormattingDisabled = !isYamlValid(props.value);

  return (
    <div className={classes.yamlEditorWrapper}>
      <ControlledCodeMirror
        {...props}
        options={{
          lineNumbers: true,
          tabSize: 2,
          mode: 'yaml',
          gutters: ['CodeMirror-lint-markers'],
          lint: true,
          ...props.options,
        }}
        className={props.className ? `${props.className} ${classes.yamlEditorRoot}` : classes.yamlEditorRoot}
      />
      <PrettierFormatTooltip title="Format">
        <div className={classes.formatButtonWrapper}>
          <IconButton
            onClick={() => props.setValue(formatYaml(props.value))}
            className={classes.formatButton}
            disabled={isFormattingDisabled}
          >
            <FormatIndentIncreaseIcon fontSize="large" />
          </IconButton>
        </div>
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
    border: 1px solid lightgray !important;
    border-radius: 0 !important;
    padding: 0.3rem !important;
  `,
  formatButtonWrapper: css`
    position: absolute;
    bottom: 50px;
    right: 50px;
    z-index: 100;
  `,
}));

const PrettierFormatTooltip = withStyles({
  tooltip: {
    background: 'lightgray',
    color: 'black',
    fontSize: '0.8rem',
  },
})(Tooltip);
