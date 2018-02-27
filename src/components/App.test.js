import React from 'react';

import {shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

describe('App',()=>{
  const app = shallow(<App/>)
  it("render properly",()=>{
    expect(app).toMatchSnapshot();
  });

  it('contains a connected wallet component',()=>{
  //  console.log(app.debug());
    expect(app.find('Connect(Wallet)').exists()).toBe(true);
  })
});
