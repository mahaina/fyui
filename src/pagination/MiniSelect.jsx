import React, {Component} from 'react';
import Select from '../select';

export default class MiniSelect extends Component {
  static Option = Select.Option;

  render() {
      return <Select size="small" {...this.props} />;
  }
}
