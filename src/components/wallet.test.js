import React from 'react';
import {shallow, configure} from 'enzyme';
import {Wallet} from './Wallet';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('wallet',()=>{
  const mockDeposit = jest.fn();
  const mockWithdraw= jest.fn();
  const props = {balance: 20, deposit: mockDeposit, withdraw: mockWithdraw}
  const wallet = shallow(<Wallet {...props}/>);
  it('render properly',()=>{
    expect(wallet).toMatchSnapshot();
  });

  it('displays the balance from props',()=>{
    expect(wallet.find('.balance').text()).toEqual('Wallet balance:20')
  });

  it('creates an input to deposit into or withdraw from the balance',()=>{
    expect(wallet.find('.input-wallet').exists()).toBe(true);
  });

  describe('when the user type into the wallet input', ()=>{
    const userBalance = '25';
    beforeEach(()=>{
      wallet.find('.input-wallet')
      .simulate('change',{target: {value: userBalance}});
    });

    it('updates the local wallet balance in `state` and coverts it into number',()=>{
      expect(wallet.state().balance).toEqual(parseInt(userBalance, 10));
    });

    describe('and user want to make a deposit',()=>{
      beforeEach(()=>wallet.find('.btn-deposit').simulate('click'));
      it('dispaches the `deposit` it receives from props with local balance',()=>{
        expect(mockDeposit).toHaveBeenCalledWith(parseInt(userBalance,10))
      });
    });

    describe('and user want to make a withdraw',()=>{
      beforeEach(()=>wallet.find('.btn-withdraw').simulate('click'));
      it('dispaches the `withdraw` it receives from props with local balance',()=>{
        expect(mockWithdraw).toHaveBeenCalledWith(parseInt(userBalance,10))
      });
    });

  });


})
