import React from 'react';
import ColorPickerWrapper from '../components-styled/ColorPickerWrapper';
import { getHSLObject } from '../utils/color-converter';
import HuePicker from '../../HuePicker';
import SaturationPicker from '../../SaturationPicker';
import LightnessPicker from '../../LightnessPicker';

const propTypes = {
  color: React.PropTypes.string,
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onColorChanged: React.PropTypes.func,
};

const defaultProps = {
  color: 'hsl(0, 100%, 50%)',
  onColorChanged: undefined,
};

export default class ColorPicker extends React.Component {

  constructor(props) {
    super(props);
    this.cache = {
      colorInput: props.color,
      colorParsed: getHSLObject(props.color),
    };
    this.onHueChanged = this.onHueChanged.bind(this);
    this.onSaturationChanged = this.onSaturationChanged.bind(this);
    this.onLightnessChange = this.onLightnessChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color === this.cache.colorInput) {
      return;
    }
    this.setCachedColor(getHSLObject(nextProps.color));
  }

  onHueChanged(h) {
    this.setCachedColor(Object.assign({}, this.cache.colorParsed, { h }));
    this.onColorChanged();
  }

  onSaturationChanged(s) {
    this.setCachedColor(Object.assign({}, this.cache.colorParsed, { s }));
    this.onColorChanged();
  }

  onLightnessChange(l) {
    this.setCachedColor(Object.assign({}, this.cache.colorParsed, { l }));
    this.onColorChanged();
  }

  onColorChanged() {
    const { onColorChanged } = this.props;
    if (onColorChanged) {
      onColorChanged(this.cache.colorInput);
    }
  }

  setCachedColor(newColorParsed) {
    this.cache = Object.assign({}, this.cache, {
      colorInput: `hsl(${Math.round(newColorParsed.h)}, ${Math.round(newColorParsed.s * 100)}%, ${Math.round(newColorParsed.l * 100)}%)`,
      colorParsed: newColorParsed,
    });
  }

  render() {
    const { colorParsed } = this.cache;
    const { height, width } = this.props;
    return (
      <ColorPickerWrapper>
        <HuePicker
          height={height}
          value={colorParsed.h}
          width={width}
          onValueChanged={this.onHueChanged}
        />
        <SaturationPicker
          height={height}
          hue={colorParsed.h}
          value={colorParsed.s}
          width={width}
          onValueChanged={this.onSaturationChanged}
        />
        <LightnessPicker
          height={height}
          hue={colorParsed.h}
          saturation={colorParsed.s}
          value={colorParsed.l}
          width={width}
          onValueChanged={this.onLightnessChange}
        />
      </ColorPickerWrapper>
    );
  }
}

ColorPicker.propTypes = propTypes;
ColorPicker.defaultProps = defaultProps;
